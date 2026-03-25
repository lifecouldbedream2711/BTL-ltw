package quanly.kham_benh.Dto.request;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceCreationRequest {
    String specialty_id,name,description;
    BigDecimal price;
    int duration_min;
    boolean active;
}

