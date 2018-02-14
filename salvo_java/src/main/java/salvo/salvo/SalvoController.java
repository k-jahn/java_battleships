package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.collectingAndThen;
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
    public List<Map<String, Object>> getAllGameIds() {
        return gameRepository.findAll().stream().map(game -> createGameMap(game)).collect(toList());
    }

    @RequestMapping("/game_view/{gamePlayerId}")
    public Map<String, Object> getGameView(@PathVariable Long gamePlayerId) {
        return createGameViewMap(gamePlayerRepository.findGamePlayerById(gamePlayerId));
    }

    @RequestMapping("/standings")
    public List<Map<String, Object>> getLeaderBoard() {
        return createStandingsMap(playerRepository.findAll());
    }


    // private output formatting methods\
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
        if (game.getGamePlayers().size() > 1) {
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

    private Map<String, Object> createSalvoMap(Salvo salvo) {
        Map<String, Object> salvoMap = new HashMap<>();
        salvoMap.put("turn", salvo.getTurn());
        salvoMap.put("locations", salvo.getLocations());
        return salvoMap;
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
