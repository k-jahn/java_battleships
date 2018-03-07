package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.persistence.Tuple;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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


    // populate database with samples

    @Bean
    public CommandLineRunner initData(PlayerRepository playerRepository,
                                      GameRepository gameRepository,
                                      GamePlayerRepository gamePlayerRepository,
                                      ShipRepository shipRepository,
                                      SalvoRepository salvoRepository,
                                      ScoreRepository scoreRepository
    ) {
        return (args) -> {
            // sample names with "supersecure" passwords
            String[][] sampleNames = {
                    {"c.obrian@ctu.gov", "Password123"},
                    {"vladimir.ilyich.ulyanov@lenin.com", "s3cr3t"},
                    {"alan.turing@blechtly-park.org.uk", "enigma39"},
                    {"benoit.mandelbrot@fractal.pl", "self-similiarity"},
                    {"sid.vicious@pistols.co.uk", "3chords"},
                    {"d.palmer@whitehouse.gov", "noreferencejoke"},
                    {"t.almeida@ctu.gov", "dito"},
                    {"j.bauer@ctu.gov", "amiaspy?"},
                    {"r.sanchez.c288@citadel.or", "g4n1u5"},
                    {"morty_s@gmail.com", "porn"},
                    {"p.fry@planet-express.com", "00brainslug"},
                    {"leela@planet-express.com", "n1bbl3r"},
                    {"h.farnsworth@planet-express.com", "good_news_everyone"},
                    {"bender@kissmy-sma.com", "myownamusementpark"},
                    {"admin@salvogame.com", "admin11"}
            };
            // sample players
            List<Player> samplePlayers = Arrays.stream(sampleNames)
                    .map(name -> new Player(name[0], name[1]))
                    .collect(Collectors.toList());
            Player admin = samplePlayers.stream()
                    .filter(player -> player.getUserName() == "admin@salvogame.com")
                    .collect(Collectors.toList()).get(0);

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
                                int numberOfPlayers = 1 + (ThreadLocalRandom.current().nextFloat() < 0.9 ? 1 : 0);
                                List<Player> excludedPlayers = new ArrayList<>();
                                excludedPlayers.add(admin);
                                for (int i = 0; i < numberOfPlayers; i++) {
                                    Boolean excludeFlag = true;
                                    Player player = null;
                                    while (excludeFlag) {
                                        player = samplePlayers.get((int) (Math.random() * samplePlayers.size()));
                                        excludeFlag = excludedPlayers.contains(player);
                                    }
                                    excludedPlayers.add(player);
                                    Date joinDate = Date.from(
                                            game.getCreationDate().toInstant().minusSeconds((int) (Math.random() * 300))
                                    );
                                    GamePlayer gamePlayer = new GamePlayer();
                                    gamePlayer.setJoinDate(joinDate);
                                    player.addGamePlayer(gamePlayer);
                                    game.addGamePlayer(gamePlayer);
                                    gamePlayers.add(gamePlayer);

                                }


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
                    .filter(game -> ThreadLocalRandom.current().nextFloat() < 0.9)
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


@Configuration
class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

    @Autowired
    PlayerRepository playerRepository;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService());
    }

    @Bean
    UserDetailsService userDetailsService() {
        return new UserDetailsService() {

            @Override
            public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
                List<Player> players = playerRepository.findByUserName(userName);
                if (!players.isEmpty()) {
                    Player player = players.get(0);
                    if (player.getUserName() == "admin@salvogame.com") {
                        return new User(player.getUserName(),
                                player.getPassword(),
                                AuthorityUtils.commaSeparatedStringToAuthorityList("USER,ADMIN"));
                    } else {
                        return new User(player.getUserName(),
                                player.getPassword(),
                                AuthorityUtils.createAuthorityList("USER"));
                    }

                } else {
                    throw new UsernameNotFoundException("Unknown user: " + userName);
                }
            }
        };
    }
}


@Configuration
@EnableWebSecurity
class  WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .authorizeRequests()
                // test url
                .antMatchers("/rest/**").hasAuthority("ADMIN")
                // basic html ist public
                .antMatchers("/web_mockup/**").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/logout").permitAll()
                .and()
                .formLogin();


        http.formLogin()
                .usernameParameter("username")
                .passwordParameter("password")
                .loginPage("/api/login");

        http.logout().logoutUrl("/api/logout");

        // turn off checking for CSRF tokens
        http.csrf().disable();

        // if user is not authenticated, just send an authentication failure response
        http.exceptionHandling().authenticationEntryPoint((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        // if login is successful, just clear the flags asking for authentication
        http.formLogin().successHandler((req, res, auth) -> clearAuthenticationAttributes(req));

        // if login fails, just send an authentication failure response
        http.formLogin().failureHandler((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        // if logout is successful, just send a success response
        http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());


    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }


    private void clearAuthenticationAttributes(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        }
    }
}


