package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,String> {

}
