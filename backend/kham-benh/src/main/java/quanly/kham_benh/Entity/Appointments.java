package quanly.kham_benh.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String patient_id;
    String doctor_id;
    String service_id,status,reason;
    LocalTime start_at,end_at;
    LocalDateTime created_at;
}
