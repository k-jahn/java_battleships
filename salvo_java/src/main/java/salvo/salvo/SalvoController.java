package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@RequestMapping("/api")
@RestController
public class SalvoController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GamePlayerRepository gamePlayerRepository;

    @RequestMapping("/games")
    public List<Map<String, Object>> getAllGameIds() {
        return gameRepository.findAll().stream().map(game -> createGameMap(game)).collect(toList());
    };


    @RequestMapping("/game_view/{gamePlayerId}")
    public Map<String,Object> getGameView(@PathVariable Long gamePlayerId) {
        return createGameViewMap(gamePlayerRepository.findGamePlayerById(gamePlayerId));
    };


    // private output formatting methods\
    private Map<String,Object>createGameMap(Game game) {
        Map<String,Object> gameMap = new HashMap<>();
        gameMap.put("id",game.getId());
        gameMap.put("creationDate", game.getCreationDate());

        List<Map<String,Object>> gamePlayerMapList = game.getGamePlayers()
                .stream()
                .map(gamePlayer -> createGamePlayerMap(gamePlayer))
                .collect(toList());

        gameMap.put("gamePlayers",gamePlayerMapList);

        return gameMap;
    }
    private Map<String, Object> createGamePlayerMap(GamePlayer gamePlayer){
        Map<String, Object> gamePlayerMap = new HashMap<>();
        gamePlayerMap.put("id", gamePlayer.getId());

        Map<String,Object> playerMap = createPlayerMap(gamePlayer.getPlayer());
        gamePlayerMap.put("player", playerMap);

        return gamePlayerMap;
    }
    private Map<String, Object> createPlayerMap(Player player){
        Map<String, Object> playerMap = new HashMap<>();
        playerMap.put("id", player.getId());
        playerMap.put("email", player.getUserName());
        return playerMap;
    }
    private Map<String,Object> createGameViewMap(GamePlayer activeGamePlayer){
        Map<String,Object> gameViewMap = new HashMap<>();
        Game game = activeGamePlayer.getGame();

        gameViewMap.put("activePlayer",activeGamePlayer.getPlayer().getId());
        gameViewMap.put("id",game.getId());
        gameViewMap.put("created",game.getCreationDate());
        gameViewMap.put("gamePlayers:", game.getGamePlayers()
                .stream()
                .map(gamePlayer -> createGamePlayerMap(gamePlayer))
                .collect(Collectors.toList()));
        gameViewMap.put("ships", activeGamePlayer.getShips()
                .stream()
                .map(ship -> createShipMap(ship))
                .collect(Collectors.toList()));
        gameViewMap.put("salvos", activeGamePlayer.getSalvos()
                .stream()
                .map(salvo -> createSalvoMap(salvo))
                .collect(Collectors.toList()));

        return gameViewMap;
    }
    private Map<String, Object> createShipMap(Ship ship) {
        Map<String,Object> shipMap = new HashMap<>();
        shipMap.put("type", ship.getShipType());
        shipMap.put( "locations", ship.getLocations());
        return shipMap;
    }

    private Map<String, Object> createSalvoMap(Salvo salvo) {
        Map<String,Object> salvoMap = new HashMap<>();
        salvoMap.put("turn", salvo.getTurn());
        salvoMap.put("locations", salvo.getLocations());
        return salvoMap;
    }


}
