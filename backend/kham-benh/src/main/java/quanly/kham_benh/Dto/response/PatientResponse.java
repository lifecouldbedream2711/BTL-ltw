package quanly.kham_benh.Dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PatientResponse {
    String id;
    String phone;
    String full_name;
    String email;
    String password_hash;

    // Thông tin patient
    LocalDate dob;
    String gender;
    String address;
    String allergies;
    String medical_history;
}