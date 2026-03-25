package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Specialty;

import java.util.Optional;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty,String> {
    boolean existsByName(String name);
    Optional<Specialty> findByName(String name);
}
