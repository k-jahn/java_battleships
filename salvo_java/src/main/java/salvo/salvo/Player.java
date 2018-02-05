package salvo.salvo;

import javax.persistence.Entity;


@Entity
public class Player {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    private String userName;

    private String lastName;

    public Player() { }

    public Player(String user) {
        userName = user;
    }

    public String getFirstName() {
        return userName;
    }

    public void setFirstName(String userName) {
        this.userName = userName;
    }

}
