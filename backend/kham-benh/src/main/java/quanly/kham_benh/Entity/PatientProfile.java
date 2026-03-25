package quanly.kham_benh.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patient_profiles")
public class PatientProfile {
    @Id
    String user_id;


    LocalDate dob;
    String gender,address,allergies,medical_history;
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    User user;
}