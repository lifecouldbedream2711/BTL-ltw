package quanly.kham_benh.Dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentStatusCountResponse {
    private String status;
    private long total;
}
