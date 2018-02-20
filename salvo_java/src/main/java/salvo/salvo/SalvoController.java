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

@RequestMapping("/api")
@RestController
public class SalvoController {


    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GamePlayerRepository gamePlayerRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @RequestMapping("/games")
    public ResponseEntity<Map<String, Object>> getGameList(Authentication authentication, Principal principal) {
        Player player = principal == null ? null : playerRepository.findByUserName(principal.getName()).get(0);
        Boolean isAdmin = authentication == null ? false : authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"));

        return new ResponseEntity<Map<String, Object>>(createGameListMap(player, isAdmin), HttpStatus.OK);
    }

    @RequestMapping("/game_view/{gamePlayerId}")
    public ResponseEntity<Object> getGameView(@PathVariable Long gamePlayerId, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
        if (authentication != null && (authentication.getName() == gamePlayer.getPlayer().getUserName() || authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN")))) {
            return new ResponseEntity<Object>(createGameViewMap(gamePlayer), HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>("{\"error\": \"not authorized to access game_view\"}", HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping("/standings")
    public List<Map<String, Object>> getLeaderBoard() {
        return createStandingsMap(playerRepository.findAll());
    }

    @RequestMapping(path = "/players", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> createPlayer(@RequestParam String username, @RequestParam String password) {
        // check if username is valid email address
        if (!Pattern.matches("^[A-Za-z0-9.\\-_]+@[A-Za-z0-9.\\-_]+\\.[A-Za-z]{2,}$", username)) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("error", "bad email");
            return new ResponseEntity<>(errorMap, HttpStatus.FORBIDDEN);
        }
        // check if username is already in use
        List<Player> playersWithName  = playerRepository.findByUserName(username);
        if (playersWithName.size()!=0) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("error", "email already in use");
            return new ResponseEntity<>(errorMap, HttpStatus.FORBIDDEN);
        }
        // check if password is valid
        if (!Pattern.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$", password)) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("error", "bad password");
            return new ResponseEntity<>(errorMap, HttpStatus.FORBIDDEN);
        }
        Player player = playerRepository.save(new Player(username,password));

        return new ResponseEntity<>(createPlayerMap(player), HttpStatus.CREATED);
    }

    // private output formatting methods\
    //        return gameRepository.findAll().stream().map(game -> createGameMap(game)).collect(toList());
    private Map<String, Object> createGameListMap(Player player, Boolean isAdmin) {
        Map<String, Object> gameListMap = new HashMap<>();
        gameListMap.put(
                "player",
                player == null ? null : createPlayerMap(player)
        );
        gameListMap.put("active_games",
                gameRepository.findAll()
                        .stream()
                        .filter(game -> game.getScores().size()==0)
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
                                        .filter(game -> game.getScores().size()!=0)
                                        .map(game -> createGameMap(game))
                                        .collect(Collectors.toList())
                                :
                                player.getGamePlayers()
                                        .stream()
                                        .map(game -> game.getGame())
                                        .filter(game -> game.getScores().size()!=0)
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
        shipMap.put("type", ship.getShipType());
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

}
