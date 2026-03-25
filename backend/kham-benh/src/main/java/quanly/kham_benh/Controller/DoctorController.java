package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Service.DoctorService;

import java.util.List;


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
    @GetMapping("Get-all")
    public APIResponse<List<DoctorResponse>> GetAllDoctor(){

        return APIResponse.<List<DoctorResponse>>builder()
                .code(200)
                .message("lấy danh sách bác sỹ thành công")
                .result(doctorService.GetAllDoctor())
                .build();

    }

}
