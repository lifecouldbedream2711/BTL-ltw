package quanly.kham_benh.Dto.response;


import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShiftResponse {
    String id;
    String doctorId;
    LocalDate shiftDate;
    LocalTime startTime;
    LocalTime endTime;
    int slotMin;
    Boolean bookable;
    int maxPatients;
    String note;
}
