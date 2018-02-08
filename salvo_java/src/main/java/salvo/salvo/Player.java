package salvo.salvo;

import javax.persistence.*;
import java.util.List;


@Entity
public class Player {

    public Player() { }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;


    @OneToMany(mappedBy = "game", fetch=FetchType.EAGER)
    private List<GamePlayer> gamePlayers;


    public void setId(long id) {

        this.id = id;
    }

    private String userName;

    public Player(String user) {
        this.userName = user;
    }

    public long getId() {
        return id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
