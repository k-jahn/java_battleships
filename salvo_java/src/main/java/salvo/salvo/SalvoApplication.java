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
                                      ShipRepository shipRepository
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
                                Player player = samplePlayers.get((int) (Math.random() * samplePlayers.size()));
                                Date joinDate = Date.from(
                                        game.getCreationDate().toInstant().minusSeconds((int) (Math.random() * 300))
                                );
                                return new GamePlayer(player, game, joinDate);
                            }
                    ).collect(Collectors.toList());
            List<GamePlayer> sampleGamePlayers2 = sampleGames.stream()
                    .filter(x -> Math.random() > 0.6)
                    .map(game -> {
                                Player player = samplePlayers.get((int) (Math.random() * samplePlayers.size()));
                                Date joinDate = Date.from(
                                        game.getCreationDate().toInstant().minusSeconds((int) (Math.random() * 300))
                                );
                                return new GamePlayer(player, game, joinDate);
                            }
                    ).collect(Collectors.toList());
            sampleGamePlayers.addAll(sampleGamePlayers2);

//             sample Ships
            List<Ship> sampleShips = new ArrayList<>();

            sampleShips.addAll(sampleGamePlayers.stream()
                    .map(gamePlayer -> {
                        List<Ship> gamePlayerShips = new ArrayList<>();
                        for (int i = 0; i < 6; i++) {
                            Ship ship = new Ship();
                            ship.setShipType(ShipType.values()[ThreadLocalRandom.current().nextInt(0, ShipType.values().length)]);
                            int len;
                            int o = ThreadLocalRandom.current().nextInt(0,2);
                            switch (ship.getShipType()) {
                                case carrier:
                                    len = 5;
                                    break;
                                case battleship:
                                    len = 4;
                                    break;
                                case cruiser:
                                case submarine:
                                    len = 3;
                                    break;
                                case destroyer:
                                    len = 2;
                            }


                            ship.addLocation("A5");
                            gamePlayer.addShip(ship);
                            gamePlayerShips.add(ship);
                        }
                        return gamePlayerShips;
                    }).flatMap(List::stream)
                    .collect(Collectors.toList())
            );


            // save to db
            samplePlayers.forEach(player -> {
                playerRepository.save(player);
            });
            sampleGames.forEach(game -> {
                gameRepository.save(game);
            });
            sampleGamePlayers.forEach(gamePlayer -> {
                gamePlayerRepository.save(gamePlayer);
            });


//            shipRepository.save(new Ship());
            sampleShips.forEach(ship -> {
                shipRepository.save(ship);
            });

        };
    }

}

