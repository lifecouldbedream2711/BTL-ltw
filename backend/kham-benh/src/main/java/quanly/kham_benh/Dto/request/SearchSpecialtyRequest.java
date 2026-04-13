package quanly.kham_benh.Dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SearchSpecialtyRequest {

    @NotBlank(message = "name must not be blank")
    private String name;
}