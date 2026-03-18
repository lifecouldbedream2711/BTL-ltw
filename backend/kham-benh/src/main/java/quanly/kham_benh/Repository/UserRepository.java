package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Users;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<Users,String> {
    Optional<Users> findByEmail(String username);
    Boolean existsByEmail(String email);
}
