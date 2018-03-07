package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;


@CrossOrigin
@RequestMapping("/api")
@RestController
public class SalvoController {

    // autowire Repos ---------------------------------------------------------------
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GamePlayerRepository gamePlayerRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private ShipRepository shipRepository;

    // map requests --------------------------------------------------------------
    @RequestMapping(path = "/games", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getGameList(Authentication authentication) {
        Player player = getAuthPlayer(authentication);
        Boolean isAdmin = isAuthAdmin(authentication);
        return new ResponseEntity<Map<String, Object>>(createGameListMap(player, isAdmin), HttpStatus.OK);
    }

    @RequestMapping(path = "/games", method = RequestMethod.POST)
    public ResponseEntity<Object> createGame(Authentication authentication) {
        //return error if not logged in
        if (!isAuthUser(authentication)) {
            return new ResponseEntity<Object>("{\"error\": \"must be logged in to create game\"}", HttpStatus.UNAUTHORIZED);
        }

        Player player = getAuthPlayer(authentication);

        //create&link java objects
        GamePlayer gamePlayer = new GamePlayer();
        player.addGamePlayer(gamePlayer);
        Game game = new Game();
        game.setCreationDate(new Date());
        game.addGamePlayer(gamePlayer);

        //save to db
        playerRepository.save(player);
        gameRepository.save(game);
        gamePlayerRepository.save(gamePlayer);

        return new ResponseEntity<Object>(createGamePlayerMap(gamePlayer), HttpStatus.CREATED);
    }

    @RequestMapping(path = "/game/{gameId}/players", method = RequestMethod.POST)
    public ResponseEntity<Object> joinGame(@PathVariable long gameId, Authentication authentication) {
        Player player = getAuthPlayer(authentication);
        if (player == null) {
            return new ResponseEntity<Object>("{\"error\": \"must be logged in to join game\"}", HttpStatus.UNAUTHORIZED);
        }
        Game game = gameRepository.findById(gameId);
        if (game == null) {
            return new ResponseEntity<Object>("{\"error\": \"so such game found\"}", HttpStatus.FORBIDDEN);
        }
        if (game.getScores().size() > 0) {
            return new ResponseEntity<Object>("{\"error\": \"game is finished\"}", HttpStatus.FORBIDDEN);
        }
        if (new HashSet<>(game.getGamePlayers()).size() > 1) {
            return new ResponseEntity<Object>("{\"error\": \"game is full\"}", HttpStatus.FORBIDDEN);
        }

        GamePlayer gamePlayer = new GamePlayer();
        game.addGamePlayer(gamePlayer);
        player.addGamePlayer(gamePlayer);

        gameRepository.save(game);
        playerRepository.save(player);
        gamePlayerRepository.save(gamePlayer);

        return new ResponseEntity<Object>(createGamePlayerMap(gamePlayer), HttpStatus.CREATED);
    }

    @RequestMapping(path = "/games/players/{gamePlayerId}/ships", method = RequestMethod.GET)
    public ResponseEntity<Object> getShipList(@PathVariable long gamePlayerId, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
        if (!(getAuthPlayer(authentication) == gamePlayer.getPlayer() || isAuthAdmin(authentication))) {
            return new ResponseEntity<Object>("{\"error\": \"not authorized to access\"}", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<Object>(
                gamePlayer.getShips()
                        .stream()
                        .map(ship -> createShipMap(ship))
                        .collect(Collectors.toList()),
                HttpStatus.OK
        );
    }

    @RequestMapping(path = "/games/players/{gamePlayerId}/ships", method = RequestMethod.POST)
    public ResponseEntity<Object> postShips(
            @PathVariable long gamePlayerId,
            Authentication authentication,
            @RequestBody List<Ship> ships

    ) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
        if (!(getAuthPlayer(authentication) == gamePlayer.getPlayer() || isAuthAdmin(authentication)))
            return new ResponseEntity<Object>("{\"error\": \"not authorized to access\"}", HttpStatus.UNAUTHORIZED);

        if (gamePlayer.getShips().size() > 0)
            return new ResponseEntity<Object>("{\"error\": \"ship data already present\"}", HttpStatus.FORBIDDEN);


        if (!isValidShipList(ships))
            return new ResponseEntity<Object>("{\"error\": \"bad ship data\"}", HttpStatus.CONFLICT);

        ships.forEach(ship -> gamePlayer.addShip(ship));
        gamePlayerRepository.save(gamePlayer);
        shipRepository.save(ships);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @RequestMapping(path = "/game_view/{gamePlayerId}", method = RequestMethod.GET)
    public ResponseEntity<Object> getGameView(@PathVariable Long gamePlayerId, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
        if (gamePlayer == null) {
            return new ResponseEntity<Object>("{\"error\": \"requested game_view not found\"}", HttpStatus.UNAUTHORIZED);
        }
        if (getAuthPlayer(authentication) == gamePlayer.getPlayer() || isAuthAdmin(authentication)) {
            return new ResponseEntity<Object>(createGameViewMap(gamePlayer), HttpStatus.OK);
        }
        return new ResponseEntity<Object>("{\"error\": \"not authorized to access game_view\"}", HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(path = "/leaderboard", method = RequestMethod.GET)
    public List<Map<String, Object>> getLeaderBoard() {
        return createStandingsMap(playerRepository.findAll());
    }

    @RequestMapping(path = "/players", method = RequestMethod.POST)
    public ResponseEntity<Object> createPlayer(@RequestParam String username, @RequestParam String password) {
        // check if username is valid email address
        if (!isValidUserName(username)) {
            return new ResponseEntity<>("{\"error\": \"not a valid email address\"}", HttpStatus.FORBIDDEN);
        }
        // check if username is already in use
        List<Player> playersWithName = playerRepository.findByUserName(username);
        if (playersWithName.size() != 0) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("error", "email already in use");
            return new ResponseEntity<>(errorMap, HttpStatus.FORBIDDEN);
        }
        // check if password is valid
        if (!isValidPassword(password)) {
            return new ResponseEntity<>("{\"error\": \"bad password\"}", HttpStatus.FORBIDDEN);
        }
        Player player = playerRepository.save(new Player(username, password));

        return new ResponseEntity<>(createPlayerMap(player), HttpStatus.CREATED);
    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public Map<String, Object> getLoggedinUser(Authentication authentication) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("user", authentication == null ? null : getAuthPlayer(authentication).getUserName());
        return userMap;
    }


    // private output formatting methods\ ------------------------------------------------------------
    private Map<String, Object> createGameListMap(Player player, Boolean isAdmin) {
        Map<String, Object> gameListMap = new HashMap<>();
        gameListMap.put(
                "player",
                player == null ? null : createPlayerMap(player)
        );
        gameListMap.put("active_games",
                gameRepository.findAll()
                        .stream()
                        .filter(game -> game.getScores().size() == 0)
                        .map(game -> createGameMap(game))
                        .collect(Collectors.toList())
        );


        gameListMap.put("past_games",
                player == null
                        ?
                        new ArrayList()
                        :
                        isAdmin
                                ?
                                gameRepository.findAll()
                                        .stream()
                                        .filter(game -> game.getScores().size() != 0)
                                        .map(game -> createGameMap(game))
                                        .collect(Collectors.toList())
                                :
                                player.getGamePlayers()
                                        .stream()
                                        .map(game -> game.getGame())
                                        .filter(game -> game.getScores().size() != 0)
                                        .map(game -> createGameMap(game))
                                        .collect(Collectors.toList())
        );
        return gameListMap;
    }


    private Map<String, Object> createGameMap(Game game) {
        Map<String, Object> gameMap = new HashMap<>();
        gameMap.put("id", game.getId());
        gameMap.put("creationDate", game.getCreationDate());

        List<Map<String, Object>> gamePlayerMapList = game.getGamePlayers()
                .stream()
                .map(gamePlayer -> createGamePlayerMap(gamePlayer))
                .collect(toList());

        gameMap.put("gamePlayers", gamePlayerMapList);

        return gameMap;
    }


    private Map<String, Object> createGamePlayerMap(GamePlayer gamePlayer) {
        Map<String, Object> gamePlayerMap = new HashMap<>();
        gamePlayerMap.put("id", gamePlayer.getId());

        gamePlayerMap.put(
                "player",
                createPlayerMap(gamePlayer.getPlayer())
        );
        Score score = gamePlayer.getPlayer().getScore(gamePlayer.getGame());
        if (score != null) {
            gamePlayerMap.put(
                    "score",
                    createScoreMap(score)
            );
        }
        return gamePlayerMap;
    }

    private Map<String, Object> createPlayerMap(Player player) {
        Map<String, Object> playerMap = new HashMap<>();
        playerMap.put("id", player.getId());
        playerMap.put("email", player.getUserName());
        return playerMap;
    }

    private Map<String, Object> createScoreMap(Score score) {
        Map<String, Object> scoreMap = new HashMap<>();
        scoreMap.put("score", score.getScore());
        scoreMap.put("finishDate", score.getFinishDate());
        return scoreMap;
    }


    private Map<String, Object> createGameViewMap(GamePlayer activeGamePlayer) {
        Map<String, Object> gameViewMap = new HashMap<>();
        Game game = activeGamePlayer.getGame();

        gameViewMap.put("player", createGamePlayerMap(activeGamePlayer));
        gameViewMap.put("id", game.getId());
        gameViewMap.put("created", game.getCreationDate());
        int q = game.getGamePlayers().size();


        if (new HashSet<GamePlayer>(game.getGamePlayers()).size() == 2) {
            gameViewMap.put("opponent", game.getGamePlayers()
                    .stream()
                    .filter(gamePlayer -> gamePlayer.getId() != activeGamePlayer.getId())
                    .map(opponent -> createGamePlayerMap(opponent))
                    .collect(Collectors.toList()).get(0)
            );
        }
        gameViewMap.put("ships", activeGamePlayer.getShips()
                .stream()
                .map(ship -> createShipMap(ship))
                .collect(Collectors.toList()));
        gameViewMap.put("salvoes", createGameSalvoMap(game));


        return gameViewMap;
    }

    private Map<String, Object> createShipMap(Ship ship) {
        Map<String, Object> shipMap = new HashMap<>();
        shipMap.put("ship_type", ship.getShipType());
        shipMap.put("locations", ship.getLocations());
        return shipMap;
    }


    private Map<String, Map<String, List<String>>> createGameSalvoMap(Game game) {
        Map<String, Map<String, List<String>>> gameSalvoMap = new HashMap<>();
        for (GamePlayer gamePlayer : game.getGamePlayers()) {
            gameSalvoMap.put(String.valueOf(gamePlayer.getId()), new HashMap<>());
            for (Salvo salvo : gamePlayer.getSalvos()) {
                gameSalvoMap.get(String.valueOf(gamePlayer.getId()))
                        .put(String.valueOf(salvo.getTurn()), salvo.getLocations());
            }
        }
        return gameSalvoMap;
    }

    private List<Map<String, Object>> createStandingsMap(List<Player> players) {
        List<Map<String, Object>> standings = new ArrayList<>();
        for (Player player : players) {

            Map<String, Object> playerMap = new HashMap<String, Object>();

            playerMap.put("id", player.getId());
            playerMap.put("email", player.getUserName());
            playerMap.put("score", player.getTotalScore());
            playerMap.put("wins", player.getTotalWins());
            playerMap.put("ties", player.getTotalTies());
            playerMap.put("losses", player.getTotalLosses());


            standings.add(playerMap);
        }
        return standings;
    }

    // validation ---------------------------------------------------------------
    private Boolean isValidShipList(List<Ship> shipList) {
        // check if body passed parser
        if (shipList == null) {
            return false;
        }

        // get gameRules, make new ShipPop Map
        GameRules gameRules = new GameRules();
        Map<ShipType, Integer> shipPop = new HashMap<>();
        for (ShipType type : ShipType.values()) {
            shipPop.put(type, 0);
        }

        List<String> takenLocs = new ArrayList<>();

        for (Ship ship : shipList) {

            //increment shipPop
            shipPop.merge(ship.getShipType(), 1, Integer::sum);

            //check if correct length
            List<String> locs = ship.getLocations();
            if (locs.size() != gameRules.getShipLength().get(ship.getShipType())) {
                return false;
            }

            //check for overlap
            List<String> overlapLocs = new ArrayList<>(takenLocs);
            overlapLocs.retainAll(ship.getLocations());
            if (overlapLocs.size() > 0) {
                return false;
            }
            takenLocs.addAll(ship.getLocations());

            //extract rows and cols
            List<Integer> cols;
            List<Integer> rows;
            try {
                rows = locs.stream()
                        .map(loc -> Integer.valueOf(loc.substring(1)))
                        .collect(Collectors.toList());
            } catch (NumberFormatException e) {
                return false;
            }
            try {
                cols = locs.stream()
                        .map(loc -> loc.codePointAt(0) - 64)
                        .collect(Collectors.toList());
            } catch (IndexOutOfBoundsException e) {
                return false;
            }

            // check if ships are well-formed TODO? make DRY
            if (cols.stream().distinct().limit(2).count() == 1
                    &&
                    cols.get(0) >= 1
                    &&
                    cols.get(0) <= gameRules.getBoardHeight()) {
                for (int i = 0; i < rows.size(); i++) {
                    if (rows.get(0) < 1 || rows.get(0) + rows.size() - 1 > gameRules.getBoardWidth())
                        if (rows.get(i) != i + rows.get(0)) return false;
                }
            } else if (rows.stream().distinct().limit(2).count() == 1
                    &&
                    rows.get(0) >= 1
                    &&
                    rows.get(0) <= gameRules.getBoardWidth()) {
                for (int i = 0; i < cols.size(); i++) {
                    if (cols.get(0) < 1 || cols.get(0) + cols.size() - 1 > gameRules.getBoardHeight())
                        return false;
                    if (cols.get(i) != i + cols.get(0))
                        return false;
                }
            } else {
                return false;
            }
        }

        // check if shipPop matches
        for (Map.Entry entry : gameRules.getShipPop().entrySet()) {
            if (shipPop.get(entry.getKey()) != entry.getValue()) {
                return false;
            }
        }

        // if all conditions pass
        return true;
    }

    private boolean isValidUserName(String username) {
        return Pattern.matches("^[A-Za-z0-9.\\-_]+@[A-Za-z0-9.\\-_]+\\.[A-Za-z]{2,}$", username);
    }

    private boolean isValidPassword(String password) {
        return Pattern.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$", password);
    }

    // helper functions ----------------------------------------------------------
    private Boolean isAuthAdmin(Authentication authentication) {
        return authentication == null ? false : authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"));
    }

    private Boolean isAuthUser(Authentication authentication) {
        return authentication == null ? false : authentication.getAuthorities().contains(new SimpleGrantedAuthority("USER"));
    }

    private Player getAuthPlayer(Authentication authentication) {

        //TODO attach player to session to save db access
        if (authentication == null) {
            return null;
        }
        List<Player> players = playerRepository.findByUserName(authentication.getName());
        return players.size() > 0 ? players.get(0) : null;
    }

}

