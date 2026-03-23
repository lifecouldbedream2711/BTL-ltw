package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Medical_records;
import quanly.kham_benh.Entity.Users;

import java.util.Optional;

@Repository
public interface MedicalRecordRepository extends JpaRepository<Medical_records,String> {

}
