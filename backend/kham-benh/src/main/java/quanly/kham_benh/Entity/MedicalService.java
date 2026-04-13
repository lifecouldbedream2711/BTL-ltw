package quanly.kham_benh.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "services")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MedicalService {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "specialty_id")
    String specialtyId;

    String name;

    String description;

    @Column(precision = 12, scale = 2)
    BigDecimal price;

    @Column(name = "duration_min")
    Integer durationMin; // wrapper class để nullable

    @Column(name = "is_active")
    Boolean active; // wrapper class để nullable
}