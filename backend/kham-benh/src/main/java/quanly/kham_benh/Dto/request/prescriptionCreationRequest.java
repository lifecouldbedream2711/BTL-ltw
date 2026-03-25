package quanly.kham_benh.Dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class prescriptionCreationRequest {
    String appointment_id,content_text;
}

