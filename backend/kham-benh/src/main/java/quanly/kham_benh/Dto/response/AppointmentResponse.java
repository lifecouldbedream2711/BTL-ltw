package quanly.kham_benh.Dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentResponse {
    String id;
    String patientId;
    String serviceId;
    String shiftId;
    String status;
    String reason;
    LocalDateTime createdAt;
    LocalTime startAt;
    LocalTime endAt;
}
