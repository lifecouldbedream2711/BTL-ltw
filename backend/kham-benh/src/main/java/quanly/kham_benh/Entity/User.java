package quanly.kham_benh.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @Column(name = "id",length = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String phone;
    String full_name;
    String email;
    String password_hash;
    String role;
    boolean is_active;
    LocalDateTime created_at;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private PatientProfile patientProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private DoctorProfile doctorProfile;
}
