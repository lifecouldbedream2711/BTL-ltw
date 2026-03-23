package quanly.kham_benh.Dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PatientCreationRequest {
    // Thông tin user
    String phone;
    String full_name;
    String email;
    String password;

    // Thông tin patient
    LocalDate dob;
    String gender;
    String address;
    String allergies;
    String medical_history;
}

