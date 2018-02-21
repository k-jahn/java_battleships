package salvo.salvo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Ship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="gamePlayer")
    private GamePlayer gamePlayer;

    private ShipType shipType;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ShipType getShipType() {
        return shipType;
    }

    public void setShipType(ShipType shipType) {
        this.shipType = shipType;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }

    public GamePlayer getGamePlayer() {

        return gamePlayer;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }


    @ElementCollection
    @Column(name="locations")
    private List<String> locations = new ArrayList<>();

    public Ship() {}
}