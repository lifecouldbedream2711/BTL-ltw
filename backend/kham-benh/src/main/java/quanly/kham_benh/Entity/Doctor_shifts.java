package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctor_shifts")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Doctor_shifts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String doctor_id;
    LocalDate shift_date;
    LocalTime start_time,end_time;
    int slot_min,max_patients;
    String note;
}
