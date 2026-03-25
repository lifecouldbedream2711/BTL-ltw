package quanly.kham_benh.Dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MedicalRecordCreationRequest {

    String appointment_id,symptoms,diagnosis,notes;
}

