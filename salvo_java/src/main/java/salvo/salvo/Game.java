package salvo.salvo;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany(mappedBy = "game", fetch=FetchType.EAGER)
    private List<GamePlayer> gamePlayers;

    public List<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public Game() {

        this.creationDate = new Date();
    }

    public Game(Date date) {
        this.creationDate = date;
    }

    public long getId() {
        return this.id;
    }

    private Date creationDate;

    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date date) {
        this.creationDate = date;
    }


}

