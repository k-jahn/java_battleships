package salvo.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}
	@Bean
	public CommandLineRunner initPlayerData(PlayerRepository repository) {
		return (args) -> {
			repository.save(new Player("jack@bauer.com"));
			repository.save(new Player("vladimir.ilyich.ulyanov@lenin.com"));
			repository.save(new Player("alan.turing@blechtly-park.org.uk"));
			repository.save(new Player("benoit.mandelbrot@fractal.pl"));
			repository.save(new Player("sid.vicious@pistols.co.uk"));
			repository.save(new Player("konrad.zuse@huenfeld.de"));
		};
	}

	@Bean
	public CommandLineRunner initGameData(GameRepository repository) {
	    Date now = new Date();
		return (args) -> {
            repository.save(new Game(Date.from(now.toInstant().minusSeconds(3600))));
            repository.save(new Game(Date.from(now.toInstant().minusSeconds(2*3600))));
			repository.save(new Game(Date.from(now.toInstant().minusSeconds(3*3600))));
		};
	}
}

