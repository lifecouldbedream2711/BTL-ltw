package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "medical_records")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Medical_record {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String appointment_id;

    String symptoms,diagnosis,notes;
    LocalDateTime created_at;
}
