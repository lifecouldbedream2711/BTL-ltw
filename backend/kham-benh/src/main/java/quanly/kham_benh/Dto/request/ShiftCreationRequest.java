package quanly.kham_benh.Dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShiftCreationRequest {
    String doctorId;
    LocalDate shiftDate;
    @Schema(type = "string", example = "08:00")
    @JsonFormat(pattern = "HH:mm")
    LocalTime startTime;

    @Schema(type = "string", example = "12:00")
    @JsonFormat(pattern = "HH:mm")
    LocalTime endTime;
    int slotMin;
    int maxPatients;
    String note;
}
