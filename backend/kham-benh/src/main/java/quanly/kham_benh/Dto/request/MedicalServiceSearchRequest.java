package quanly.kham_benh.Dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MedicalServiceSearchRequest {

    @Schema(example = "uuid-specialty-id")
    String specialtyId;

    @Schema(example = "khám")
    String keyword; // search name + description

    @Schema(example = "100000")
    BigDecimal minPrice;

    @Schema(example = "500000")
    BigDecimal maxPrice;

    @Schema(example = "15")
    Integer minDuration;

    @Schema(example = "60")
    Integer maxDuration;

    @Schema(example = "true")
    Boolean active;
}