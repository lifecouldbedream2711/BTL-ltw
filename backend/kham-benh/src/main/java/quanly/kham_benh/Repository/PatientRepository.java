package quanly.kham_benh.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.PatientProfile;

@Repository
public interface PatientRepository extends JpaRepository<PatientProfile,String> {
}
