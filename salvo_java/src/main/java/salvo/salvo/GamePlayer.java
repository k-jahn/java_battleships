package salvo.salvo;

import javax.persistence.*;
import java.util.Date;

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


