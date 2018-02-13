package salvo.salvo;

import java.time.DayOfWeek;
import java.util.HashMap;
import java.util.Map;

public class GameRules {
    private Map<ShipType, Integer> shipPop;

    private Map<ShipType, Integer> shipLength;

    public Map<ShipType, Integer> getShipLength() {
        return shipLength;
    }

    public void setShipLength(Map<ShipType, Integer> shipLength) {
        this.shipLength = shipLength;
    }

    public Map<ShipType, Integer> getShipPop() {

        return shipPop;
    }

    public void setShipPop(Map<ShipType, Integer> shipPop) {
        this.shipPop = shipPop;
    }

    private int boardHeight;

    private int boardWidth;

    // default ruleset
    public GameRules() {
        // build shipPop map
        Map<ShipType, Integer> shipPop = new HashMap<>();
        for (ShipType type : ShipType.values()) {
            shipPop.put(type, 1);
        }
        this.shipPop = shipPop;
        // build shipLength map
        Map<ShipType, Integer> shipLength = new HashMap<>();
        for (ShipType type : ShipType.values()) {
            int  length = 0;
            switch (type) {
                case destroyer:
                    length=2;
                    break;
                case battleship:
                    length=4;
                    break;
                case cruiser:
                    length=3;
                    break;
                case carrier:
                    length=5;
                    break;
                case submarine:
                    length=3;
                    break;
            }
            shipLength.put(type, length);
        }
        this.shipLength = shipLength;
        this.boardHeight = 10;
        this.boardWidth = 10;
    }


    public int getBoardHeight() {
        return boardHeight;
    }

    public void setBoardHeight(int boardHeight) {
        this.boardHeight = boardHeight;
    }

    public int getBoardWidth() {
        return boardWidth;
    }

    public void setBoardWidth(int boardWidth) {
        this.boardWidth = boardWidth;
    }
}
