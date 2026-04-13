package quanly.kham_benh.Controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.*;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.AddSpecialtyResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Interface.SpecialtySummaryProjection;
import quanly.kham_benh.Service.AdminService;
import quanly.kham_benh.Service.SpecialtyService;

import java.util.ArrayList;
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
    // Controller (giữ style hiện tại)
    @PostMapping("/Specialty/get-by-name")
    public APIResponse<List<SpecialtySummaryProjection>> getByName(
            @RequestBody SearchSpecialtyRequest request
    ) {
        APIResponse<List<SpecialtySummaryProjection>> res = new APIResponse<>();
        res.setCode(0);
        res.setMessage("Success");
        res.setResult(specialtyService.searchSummaryByName(request.getName()));
        return res;
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
    @GetMapping("/  get-all-summary")
    public APIResponse<List<SpecialtySummaryProjection>> getAllSummary() {
        APIResponse<List<SpecialtySummaryProjection>> res = new APIResponse<>();
        res.setCode(0);
        res.setMessage("Success");
        res.setResult(specialtyService.getAllSpecialtySummary());
        return res;
    }
    @PutMapping("/add-many-doctor")
    public APIResponse<List<AddSpecialtyResponse>> AddManyDoctor(@RequestBody  List<AddSpecialtyRequest> request){
        List<AddSpecialtyResponse> result=new ArrayList<>();

        request.forEach(
                item-> result.add(specialtyService.AddSpecialty(item))
        );

        return APIResponse.<List<AddSpecialtyResponse>>builder()
                .code(200)
                .message("add success")
                .result(result)
                .build();
    }
}
