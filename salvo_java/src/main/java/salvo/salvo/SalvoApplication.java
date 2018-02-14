package salvo.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@SpringBootApplication
public class SalvoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalvoApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(PlayerRepository playerRepository,
                                      GameRepository gameRepository,
                                      GamePlayerRepository gamePlayerRepository,
                                      ShipRepository shipRepository,
                                      SalvoRepository salvoRepository,
                                      ScoreRepository scoreRepository
    ) {
        return (args) -> {
            // sample names
            String[] sampleNames = {"c.obrian@ctu.gov",
                    "vladimir.ilyich.ulyanov@lenin.com",
                    "alan.turing@blechtly-park.org.uk",
                    "benoit.mandelbrot@fractal.pl",
                    "sid.vicious@pistols.co.uk",
                    "konrad.zuse@huenfeld.de",
                    "d.palmer@whitehouse.gov",
                    "t.almeida@ctu.gov",
                    "j.bauer@ctu.gov",
                    "r.sanchez.c288@citadel.or",
                    "morty_s@gmail.com",
                    "p.fry@planet-express.com",
                    "leela@planet-express.com",
                    "h.farnsworth@planet-express.com",
                    "bender@kissmy-sma.com",
            };
            // sample players
            List<Player> samplePlayers = Arrays.stream(sampleNames)
                    .map(name -> new Player(name))
                    .collect(Collectors.toList());


            // sample games
            Date now = new Date();

            List<Game> sampleGames = new ArrayList<>();
            for (int i = 0; i < 100; i++) {
                sampleGames.add(
                        new Game(Date.from(
                                now.toInstant()
                                        .minusSeconds((int) (3600.0 * 48.0 * Math.random()))
                        ))
                );
            }

            // sample gamePlayers
            List<GamePlayer> sampleGamePlayers = sampleGames.stream()
                    .map(game -> {


                        List<GamePlayer> gamePlayers = new ArrayList<>();
                                int numberOfPlayers = 1 + (ThreadLocalRandom.current().nextFloat() < 0.8 ? 1 : 0);
                                List<Player> excludedPlayers = new ArrayList<>();

                        for (int i = 0; i < numberOfPlayers; i++) {
                                    Boolean excludeFlag = true;
                                    Player player = null;
                                    while (excludeFlag) {
                                        player = samplePlayers.get((int) (Math.random() * samplePlayers.size()));
                                        excludeFlag = excludedPlayers.contains(player);
                                        excludedPlayers.add(player);
                                    }
                                    Date joinDate = Date.from(
                                            game.getCreationDate().toInstant().minusSeconds((int) (Math.random() * 300))
                                    );
                                    gamePlayers.add(new GamePlayer(player, game, joinDate));
                                }

                                game.setGamePlayers(gamePlayers);

                        return gamePlayers;
                            }
                    ).flatMap(List::stream).collect(Collectors.toList());

            // sample Ships
            List<Ship> sampleShips = new ArrayList<>();
            AIPlayer ai = new AIPlayer();

            sampleShips.addAll(sampleGamePlayers.stream()
                    .map(gamePlayer -> {
                        List<Ship> gamePlayerShips = ai.generateBoard();
                        gamePlayerShips.forEach(ship -> gamePlayer.addShip(ship));
                        return gamePlayerShips;
                    }).flatMap(List::stream)
                    .collect(Collectors.toList())
            );

            // sample salvos
            List<Salvo> sampleSalvoes = new ArrayList<>();
            sampleGames.forEach(game -> {
                if (game.getGamePlayers().size() == 1) {
                    return;
                }
                int turns = ThreadLocalRandom.current().nextInt(0, 20);
                for (GamePlayer gamePlayer : game.getGamePlayers()) {
                    List<String> previousSalvos = new ArrayList<>();
                    for (int turn = 1; turn <= turns; turn++) {
                        Salvo salvo = new Salvo();
                        salvo.setTurn(turn);
                        for (int j = 0; j < 2; j++) {
                            String loc = "";
                            Boolean containsFlag = true;
                            while (containsFlag) {
                                loc = Character.toString((char) (ThreadLocalRandom.current().nextInt(1, 11) + 64))
                                        +
                                        String.valueOf(ThreadLocalRandom.current().nextInt(1, 11));
                                containsFlag = previousSalvos.contains(loc);
                            }
                            previousSalvos.add(loc);
                            salvo.addLocation(loc);
                        }
                        gamePlayer.addSalvo(salvo);
                        sampleSalvoes.add(salvo);

                    }
                }
                ;
            });


            //sample Scores
            List<Score> sampleScores = sampleGames.stream()
                    .filter(game -> game.getGamePlayers().size() > 1)
                    .filter(game -> ThreadLocalRandom.current().nextFloat() < 0.7)
                    .map(game -> {
                        List<Score> scores = new ArrayList<>();
                        double pointsScored = ((float) ThreadLocalRandom.current().nextInt(0, 3)) / 2.0;
                        for (GamePlayer gamePlayer : game.getGamePlayers()) {
                            Score score = new Score();
                            score.setFinishDate(
                                    Date.from(gamePlayer.getJoinDate()
                                            .toInstant()
                                            .plusSeconds(
                                                    ThreadLocalRandom.current().nextInt(60, 600)
                                            ))
                            );
                            score.setScore(
                                    pointsScored
                            );
                            pointsScored = 1 - pointsScored;
                            gamePlayer.getGame().addScore(score);
                            gamePlayer.getPlayer().addScore(score);
                            scores.add(score);
                        }
                        return scores;
                    }).flatMap(List::stream)
                    .collect(Collectors.toList());

            // save to db
            samplePlayers.forEach(player -> playerRepository.save(player));
            sampleGames.forEach(game -> gameRepository.save(game));
            sampleGamePlayers.forEach(gamePlayer -> gamePlayerRepository.save(gamePlayer));
            sampleShips.forEach(ship -> shipRepository.save(ship));
            sampleSalvoes.forEach(salvo -> salvoRepository.save(salvo));
            sampleScores.forEach(score -> scoreRepository.save(score));
        };
    }

}

