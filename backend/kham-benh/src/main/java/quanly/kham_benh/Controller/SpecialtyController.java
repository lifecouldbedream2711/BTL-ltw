package quanly.kham_benh.Controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.AddSpecialtyRequest;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.AddSpecialtyResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Service.AdminService;
import quanly.kham_benh.Service.SpecialtyService;

import java.util.List;

@RestController
@RequestMapping("/Specialty")
@Tag(name = "Specialty API", description = "Các API quản lý khoa")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SpecialtyController {

    SpecialtyService specialtyService;
    @PostMapping("/create")
    public APIResponse<SpecialtyResponse> createSpecialty(@RequestBody SpecialtyCreationRequest request){
        return APIResponse.<SpecialtyResponse>builder()
                .code(200)
                .message("Create Specialty success")
                .result(specialtyService.CreateSpecialty(request))
                .build();
    }
    @PutMapping("/Update/{Id}")
    public APIResponse<SpecialtyResponse> UpdateSpecialty(@RequestBody SpecialtyCreationRequest request,@PathVariable("Id") String id){
        return APIResponse.<SpecialtyResponse>builder()
                .code(200)
                .message("Update Specialty success")
                .result(specialtyService.UpdateSpecialty(id,request))
                .build();
    }
    @GetMapping("/get-all")
    public APIResponse<List<SpecialtyResponse>> GetAllSpecialty(){
        return APIResponse.<List<SpecialtyResponse>>builder()
                .code(200)
                .message("Get all specialty success")
                .result(specialtyService.GetAllSpecialty())
                .build();
    }
    @DeleteMapping("/Delete/{id}")
    public APIResponse<String> DeleteSpecialty(@PathVariable("id") String id){
        return APIResponse.<String>builder()
                .code(200)
                .message("Xóa thành công")
                .result(specialtyService.DeleteSpecialty(id))
                .build();
    }
    @PutMapping("/add-doctor")
    public APIResponse<AddSpecialtyResponse> AddDoctor(AddSpecialtyRequest request){
        return APIResponse.<AddSpecialtyResponse>builder()
                .code(200)
                .message("add success")
                .result(specialtyService.AddSpecialty(request))
                .build();
    }
}
