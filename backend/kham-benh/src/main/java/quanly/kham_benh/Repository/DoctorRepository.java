package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.DoctorProfile;

import java.util.Optional;

@Repository
public interface DoctorRepository  extends JpaRepository<DoctorProfile,String> {
    Optional<DoctorProfile> findById(String id);
    boolean existsById(String s);
}
