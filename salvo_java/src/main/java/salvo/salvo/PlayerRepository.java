package salvo.salvo;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,Long> {
    List<Player> findByUserName(String userName);
}


//package example;
//
//        import java.util.List;
//        import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface PersonRepository extends JpaRepository<Person, Long> {
//    List<Person> findByLastName(String lastName);
//}