package quanly.kham_benh.Dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopDoctorResponse {
    String doctorId;
    String doctorName;
    int totalAppointments;
}
