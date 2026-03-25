package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "prescriptions")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String appointment_id;
    String content_text;
    LocalDateTime created_at;

}
