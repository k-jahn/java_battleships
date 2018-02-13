package salvo.salvo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class GamePlayer {
    public long getId() {
        return id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;

    public List<Ship> getShips() {
        return ships;
    }


    public void setId(long id) {

        this.id = id;
    }

    public void addShip(Ship ship) {
        ship.setGamePlayer(this);
        this.ships.add(ship);
    }

    @OneToMany(mappedBy = "gamePlayer")
    private List<Ship> ships = new ArrayList<>();

    @OneToMany(mappedBy = "gamePlayer")
    private List<Salvo> salvos = new ArrayList<>();

    public void setShips(List<Ship> ships) {
        this.ships = ships;
    }

    public List<Salvo> getSalvos() {
        return salvos;
    }

    public void setSalvos(List<Salvo> salvos) {
        salvos = salvos;
    }

    public void addSalvo(Salvo salvo) {
        salvo.setGamePlayer(this);
        this.salvos.add(salvo);
    }

    private Date joinDate;

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Player getPlayer() {

        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    // empty constructor
    public GamePlayer() {
    }

    public GamePlayer(Player player, Game game, Date joinDate) {
        this.player = player;
        this.game = game;
        this.joinDate = joinDate;
    }

}


