package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "specialties")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Specialties {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name,description;

    @OneToMany(mappedBy = "specialty", cascade = CascadeType.ALL, orphanRemoval = true)
    List<DoctorProfile> doctors = new ArrayList<>();
}
