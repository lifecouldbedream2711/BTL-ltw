package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Shift;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift,String> {
    List<Shift> findByShiftDate(LocalDate shiftDate);
    List<Shift> findByDoctorId(String id);
}
