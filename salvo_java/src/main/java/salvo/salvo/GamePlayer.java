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
    private Player game;

    public Player getGame() {
        return game;
    }

    public void setGame(Player game) {
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

}


