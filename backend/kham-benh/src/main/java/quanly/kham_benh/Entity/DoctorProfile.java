package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "doctor_profiles")
public class DoctorProfile {
    @Id
    String id;

    @Column(name = "specialty_id")
    private String specialtyId;
    private String license_no,bio;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

}
