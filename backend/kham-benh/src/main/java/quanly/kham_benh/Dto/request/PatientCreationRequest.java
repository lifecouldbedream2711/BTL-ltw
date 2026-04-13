package quanly.kham_benh.Dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(defaultValue = "abc@gmail.com")
    String email;
    String password;

    // Thông tin patient
    LocalDate dob;
    @Schema(defaultValue = "MALE")
    String gender;
    String address;
    String allergies;
    String medical_history;
}

