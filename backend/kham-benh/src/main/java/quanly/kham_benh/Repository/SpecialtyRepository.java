package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Specialties;
import quanly.kham_benh.Entity.Users;

import java.util.Optional;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialties,String> {

}
