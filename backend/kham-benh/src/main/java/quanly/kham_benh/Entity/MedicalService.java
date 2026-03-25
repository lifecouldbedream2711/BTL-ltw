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

    String specialty_id,name,description;
    @Column(precision = 12, scale = 2)
    BigDecimal price;
    int duration_min;
    @Column(name = "is_active")
    boolean active;
}
