package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Entity.Shift;
import quanly.kham_benh.Service.PatientService;
import quanly.kham_benh.Service.ShiftService;

import java.util.List;


@RestController
@RequestMapping("/shift")
@Tag(name = "Shift API", description = "Các API quản lý ca làm")
public class ShiftController {

    @Autowired
    ShiftService shiftService;

    @PostMapping("/create")
    public APIResponse<ShiftResponse> CreatePatient(@RequestBody ShiftCreationRequest request){
        return APIResponse.<ShiftResponse>builder()
                .message("Create shift success")
                .code(200)
                .result(shiftService.createShift(request))
                .build();
    }
    @GetMapping("Get-all")
    public APIResponse<List<ShiftResponse>> GetAllShift(){
        return APIResponse.<List<ShiftResponse>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(shiftService.GetAllShift())
                .build();

    }
    @GetMapping("Get/{id}")
    public APIResponse<List<ShiftResponse>> GetDoctorShift(@PathVariable("id") String id){
        return APIResponse.<List<ShiftResponse>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(shiftService.GetDoctorShift(id))
                .build();

    }
}
