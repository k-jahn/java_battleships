package salvo.salvo;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Salvo {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int turn;

    @ElementCollection
    @Column(name="locations")
    private List<String> locations = new ArrayList<>();


    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="gamePlayer")
    private GamePlayer gamePlayer;

    public void setId(long id) {
        this.id = id;
    }

    public int getTurn() {
        return turn;
    }

    public void setTurn(int turn) {
        this.turn = turn;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }

    public long getId() {
        return id;
    }

    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    public void addLocation(String location) {
        this.locations.add(location);

    }
}
