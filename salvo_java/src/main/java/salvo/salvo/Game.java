package salvo.salvo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
    private List<GamePlayer> gamePlayers =  new ArrayList<>();

    @OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
    private List<Score> scores = new ArrayList<>();

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


    public void setGamePlayers(List<GamePlayer> gamePlayers) {
        this.gamePlayers = gamePlayers;
    }

    public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setGame(this);
        this.gamePlayers.add(gamePlayer);
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Score> getScores() {
        return scores;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public void addScore(Score score) {
        score.setGame(this);
        this.scores.add(score);
    }
}

