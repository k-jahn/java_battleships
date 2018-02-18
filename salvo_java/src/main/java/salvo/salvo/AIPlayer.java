package salvo.salvo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

public class AIPlayer {

    private GameRules rules;


    public AIPlayer() {
        this.rules = new GameRules();
    }

    // constructor with custom ruleset
    public AIPlayer(GameRules rules) {
        this.rules = rules;
    }

    // generate a board (list of ships) with legal locations
    public List<Ship> generateBoard() {

        List<Ship> shipList = new ArrayList<>();

        // get constraining values from rules
        Map<ShipType, Integer> shipLength = this.rules.getShipLength();
        int boardHeight = this.rules.getBoardHeight();
        int boardWidth = this.rules.getBoardWidth();

        // naive main loop - will crash if board small / too many ships and no legal locations are available
        // optionalTODO: make robust, mb place large ships first for efficiency
        List<String> occupiedLocations = new ArrayList<>();
        for (Map.Entry<ShipType, Integer> entry : this.rules.getShipPop().entrySet()) {

            int length = shipLength.get(entry.getKey());

            for (int i = 0; i < entry.getValue(); i++) {

                Ship ship = new Ship();
                ship.setShipType(entry.getKey());
                Boolean boardLegal = false;
                List<String> shipLocations = new ArrayList<>();

                while (!boardLegal) {

                    shipLocations = new ArrayList<>();
                    boardLegal = true;
                    int x, y;
                    Boolean horizontal = ThreadLocalRandom.current().nextBoolean();

                    x = ThreadLocalRandom.current().nextInt(1, 1+boardWidth - ((horizontal) ? length : 0));
                    y = ThreadLocalRandom.current().nextInt(1, 1+boardHeight - ((horizontal) ? 0 : length));
                    for (int j = 0; j < length; j++) {
                        String loc = Character.toString((char) (x + 64 + ((horizontal) ? j : 0))) + String.valueOf(y + ((horizontal) ? 0 : j));
                        if (occupiedLocations.contains(loc)) {
                            boardLegal = false;
                            break;
                        }
                        shipLocations.add(loc);
                    }
                }
                occupiedLocations.addAll(shipLocations);
                ship.setLocations(shipLocations);
                shipList.add(ship);
            }
        }
        return shipList;
    }
}
