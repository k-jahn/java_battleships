package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RequestMapping("/api")
@RestController
public class SalvoController {

    @Autowired
    private GameRepository gameRepository;


    @RequestMapping("/games")
    public List<Map<String, Object>> getAllGameIds() {
        return gameRepository.findAll().stream().map(game -> createGameMap(game)).collect(toList());
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

}
