package quanly.kham_benh.Dto.response;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceResponse {
    String id;
    String specialty_id,name,description;
    BigDecimal price;
    int duration_min;
    boolean active;
}
