package salvo.salvo;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface GamePlayerRepository extends JpaRepository<GamePlayer,Long> {
    List<GamePlayer> findById(long id);
    List<GamePlayer> findByPlayerId(long playerId);
    List<GamePlayer> findByGameId(long gameId);
}

