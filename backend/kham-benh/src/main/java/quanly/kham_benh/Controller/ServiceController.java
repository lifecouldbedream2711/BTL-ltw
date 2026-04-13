package quanly.kham_benh.Controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.AddSpecialtyRequest;
import quanly.kham_benh.Dto.request.MedicalRecordCreationRequest;
import quanly.kham_benh.Dto.request.MedicalServiceSearchRequest;
import quanly.kham_benh.Dto.request.ServiceCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.AddSpecialtyResponse;
import quanly.kham_benh.Dto.response.ServiceResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.MedicalService;
import quanly.kham_benh.Service.MedicalServiceService;
import quanly.kham_benh.Service.SpecialtyService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/Service")
@Tag(name = "Service API", description = "Các API quản lý Service")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ServiceController {
    MedicalServiceService medicalServiceService;
    SpecialtyService specialtyService;
    @PostMapping("/create")
    public APIResponse<ServiceResponse> createSpecialty(@RequestBody ServiceCreationRequest request){
        return APIResponse.<ServiceResponse>builder()
                .code(200)
                .message("Create Service success")
                .result(medicalServiceService.CreateService(request))
                .build();
    }
    @PutMapping("/Update/{Id}")
    public APIResponse<ServiceResponse> UpdateSpecialty(@RequestBody ServiceCreationRequest request,@PathVariable("Id") String id){
        return APIResponse.<ServiceResponse>builder()
                .code(200)
                .message("Update Service success")
                .result(medicalServiceService.UpdateService(request,id))
                .build();
    }
    @GetMapping("/get-all")
    public APIResponse<List<ServiceResponse>> GetAllService(){
        return APIResponse.<List<ServiceResponse>>builder()
                .code(200)
                .message("Get all service success")
                .result(medicalServiceService.GetAllService())
                .build();
    }
    @PostMapping("/find-by-key")
    public APIResponse<List<MedicalService>> FindService(@RequestBody MedicalServiceSearchRequest request){
        return APIResponse.<List<MedicalService>>builder()
                .code(200)
                .message("Get Service by key success")
                .result(medicalServiceService.search(request))
                .build();
    }
    @PostMapping("/create-many")
    public APIResponse<List<ServiceResponse>> createMany(@RequestBody List<ServiceCreationRequest> request) {
        List<ServiceResponse> result = new ArrayList<>();

        request.forEach(item -> result.add(medicalServiceService.CreateService(item)));

        return APIResponse.<List<ServiceResponse>>builder()
                .code(200)
                .message("Create many services success")
                .result(result)
                .build();
    }
    @DeleteMapping("/Delete/{id}")
    public APIResponse<String> DeleteSpecialty(@PathVariable("id") String id){
        return APIResponse.<String>builder()
                .code(200)
                .message("Xóa thành công")
                .result(medicalServiceService.DeleteService(id))
                .build();
    }

}
