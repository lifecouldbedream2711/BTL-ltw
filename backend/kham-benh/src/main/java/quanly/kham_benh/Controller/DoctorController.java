package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.AddManyDoctorRequest;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.request.FindByDoctorNameRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Interface.DoctorInfoProjection;
import quanly.kham_benh.Service.DoctorService;

import java.util.List;


@RestController
@RequestMapping("/doctor")
@Tag(name = "Doctor API", description = "Các API quản lý Doctor")
public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @PostMapping("Create")
    public APIResponse<DoctorResponse> CreateDoctor(@RequestBody DoctorCreationRequest request){

        return APIResponse.<DoctorResponse>builder()
                .code(200)
                .message("Create Doctor success")
                .result(doctorService.CreateDoctor(request))
                .build();

    }
    @PutMapping("update/{id}")
    public APIResponse<DoctorResponse> UpdateDoctor(@PathVariable("id")String id,@RequestBody DoctorCreationRequest request){

        return APIResponse.<DoctorResponse>builder()
                .code(200)
                .message("Update Doctor success")
                .result(doctorService.UpdateDoctor(id,request))
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

    @PostMapping("Find-by-name")
    public APIResponse<List<DoctorResponse>> GetDoctor(@RequestBody FindByDoctorNameRequest request){

        return APIResponse.<List<DoctorResponse>>builder()
                .code(200)
                .message("lấy danh sách bác sỹ thành công")
                .result(doctorService.GetDoctorByName(request.getName()))
                .build();

    }
    @PostMapping("Get-by-specialty/{id}")
    public APIResponse<List<DoctorResponse>> GetDoctor(@PathVariable String id){

        return APIResponse.<List<DoctorResponse>>builder()
                .code(200)
                .message("lấy danh sách bác sỹ thành công")
                .result(doctorService.GetDoctorBySpecialty(id))
                .build();

    }
    @PostMapping("Create-many")
    public APIResponse<List<DoctorResponse>> CreatemanyDoctor(@RequestBody  AddManyDoctorRequest request){

        return APIResponse.<List<DoctorResponse>>builder()
                .code(200)
                .message("lấy danh sách bác sỹ thành công")
                .result(doctorService.CreateMany(request))
                .build();

    }
    // DoctorController.java
    @GetMapping("/doctor/{id}")
    public DoctorInfoProjection getDoctorById(@PathVariable String id) {
        return doctorService.getDoctorInfoById(id);
    }


}
