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
public class DoctorCreationRequest {
    String phone;
    String full_name;
    @Schema(defaultValue = "abc@gmail.com")
    String email;
    String password_hash;

    String license_no,bio;
}

