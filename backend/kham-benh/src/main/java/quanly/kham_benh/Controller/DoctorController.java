package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Service.DoctorService;


@RestController
@RequestMapping("/doctor")
@Tag(name = "Doctor API", description = "Các API quản lý Patient")
public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @PostMapping("Create")
    public APIResponse<DoctorResponse> CreateDoctor(@RequestBody DoctorCreationRequest request){

        return APIResponse.<DoctorResponse>builder()
                .code(200)
                .message("Tạo bác sỹ thành công")
                .result(doctorService.CreateDoctor(request))
                .build();

    }

}
