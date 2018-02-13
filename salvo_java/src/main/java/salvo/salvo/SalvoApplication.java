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
                                      SalvoRepository salvoRepository
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
                    "j.bauer@ctu.gov"
            };
            // sample players
            List<Player> samplePlayers = Arrays.stream(sampleNames)
                    .map(name -> new Player(name))
                    .collect(Collectors.toList());


            // sample games
            Date now = new Date();

            List<Game> sampleGames = new ArrayList<>();
            for (int i = 0; i < 20; i++) {
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
                                for (int i = 0; i < ThreadLocalRandom.current().nextInt(1,3); i++) {
                                    Player player = samplePlayers.get((int) (Math.random() * samplePlayers.size()));
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
                if (game.getGamePlayers().size()==1) {return;}
                int turns = ThreadLocalRandom.current().nextInt(0, 20);
                for (GamePlayer gamePlayer : game.getGamePlayers()) {
                    for (int turn = 1; turn <= turns; turn++) {
                        Salvo salvo = new Salvo();
                        salvo.setTurn(turn);
                        for (int j = 0; j < 2; j++) {
                            salvo.addLocation(
                                    Character.toString((char)(ThreadLocalRandom.current().nextInt(1, 11) + 64))
                                            +
                                            String.valueOf(ThreadLocalRandom.current().nextInt(1, 11))
                            );
                        }
                        gamePlayer.addSalvo(salvo);
                        sampleSalvoes.add(salvo);

                    }
                }
                ;
            });

            // save to db
            samplePlayers.forEach(player -> playerRepository.save(player));
            sampleGames.forEach(game -> gameRepository.save(game));
            sampleGamePlayers.forEach(gamePlayer -> gamePlayerRepository.save(gamePlayer));
            sampleShips.forEach(ship -> shipRepository.save(ship));
            sampleSalvoes.forEach(salvo -> salvoRepository.save(salvo));

        };
    }

}

