package quanly.kham_benh.Dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorCreationRequest {
    String phone;
    String full_name;
    String email;
    String password_hash;

    String license_no,bio;
}

