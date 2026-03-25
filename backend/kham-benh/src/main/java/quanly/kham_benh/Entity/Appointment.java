package quanly.kham_benh.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "patient_id", nullable = false)
    String patientId;

    @Column(name = "service_id", nullable = false)
    String serviceId;

    @Column(name = "shift_id", nullable = false)
    String shiftId;

    @Column(name = "start_at", nullable = false)
    LocalTime startAt;

    @Column(name = "end_at", nullable = false)
    LocalTime endAt;

    @Column(name = "status", nullable = false)
    String status;

    String reason;

    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}