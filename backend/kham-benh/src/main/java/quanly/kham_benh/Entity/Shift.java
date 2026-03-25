package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctor_shifts")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "doctor_id")
    String doctorId;

    @Column(name = "shift_date")
    LocalDate shiftDate;

    @Column(name = "start_time")
    LocalTime startTime;

    @Column(name = "end_time")
    LocalTime endTime;

    @Column(name = "slot_min")
    int slotMin;

    @Column(name = "max_patients")
    int maxPatients;

    String note;
}
