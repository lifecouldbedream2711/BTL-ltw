package quanly.kham_benh.Dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorResponse {
    String id;
    String phone;
    String full_name;
    String specialtyId;
    String email;
    String password_hash;
    String license_no,bio;

}
