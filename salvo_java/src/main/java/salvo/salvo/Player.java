package salvo.salvo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;


@Entity
public class Player {

    public Player() { }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;


    public List<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public void setGamePlayers(List<GamePlayer> gamePlayers) {
        this.gamePlayers = gamePlayers;
    }

    public List<Score> getScores() {
        return scores;
    }

    public Score getScore(Game game) {
        for (Score score : this.scores) {
            if (score.getGame() == game) {
                return score;
            }
        }
        return null;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public void addScore(Score score){
        score.setPlayer(this);
        this.scores.add(score);
    }

    @OneToMany(mappedBy = "player", fetch=FetchType.EAGER)
    private List<GamePlayer> gamePlayers = new ArrayList<>();


    @OneToMany(mappedBy = "player", fetch=FetchType.EAGER)
    private List<Score> scores = new ArrayList<>();




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


    public float getTotalScore() {
        float totalScore =0;
        for (Score score : this.scores) {
            totalScore += score.getScore();
        }
        return totalScore;
    }

    public int getTotalWins() {
        return this.scores.stream().mapToInt(score -> score.getScore() == 1? 1:0).sum();
    }
    public int getTotalTies() {
        return this.scores.stream().mapToInt(score -> score.getScore() == 0.5? 1:0).sum();
    }
    public int getTotalLosses() {
        return this.scores.stream().mapToInt(score -> score.getScore() == 0? 1:0).sum();
    }

}
