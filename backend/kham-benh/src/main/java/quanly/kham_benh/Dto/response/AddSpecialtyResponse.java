package quanly.kham_benh.Dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddSpecialtyResponse {
    String SpecialtyName,DoctorName;
}
