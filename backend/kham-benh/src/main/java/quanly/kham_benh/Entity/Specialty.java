package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "specialties")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Specialty {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name,description;
}
