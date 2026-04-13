package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.FindShiftInDayRequest;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Entity.Shift;
import quanly.kham_benh.Service.PatientService;
import quanly.kham_benh.Service.ShiftService;

import java.util.ArrayList;
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
    @GetMapping("Get-by-Doctor/{id}")
    public APIResponse<List<ShiftResponse>> GetShift(@PathVariable("id") String id){
        return APIResponse.<List<ShiftResponse>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(shiftService.GetDoctorShift(id  ))
                .build();

    }
    @PatchMapping("Turn-off/{id}")
    public APIResponse<String> TurnOffShift(@PathVariable("id") String id){
        return APIResponse.<String>builder()
                .code(200)
                .message("success")
                .result(shiftService.TurnOffBookable(id))
                .build();
    }
    @PatchMapping("Turn-on/{id}")
    public APIResponse<String> TurnOnShift(@PathVariable("id") String id){
        return APIResponse.<String>builder()
                .code(200)
                .message("success")
                .result(shiftService.TurnOffBookable(id))
                .build();
    }
    @PostMapping("Create-many")
    public APIResponse<List<ShiftResponse>> Createmany(@RequestBody List<ShiftCreationRequest> requests){
        List<ShiftResponse> result=new ArrayList<>();
        requests.forEach(
                item-> result.add(shiftService.createShift(item))
        );
        return APIResponse.<List<ShiftResponse>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(result)
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
    @PostMapping("Find-to-book")
    public APIResponse<List<ShiftResponse>> GetShiftByDoctorandDate(@RequestBody FindShiftInDayRequest request){
        return APIResponse.<List<ShiftResponse>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(shiftService.FinByDoctorAndDate(request))
                .build();

    }
    @PostMapping("Find-slot")
    public APIResponse<List<String>> GetSlotByDoctorandDate(@RequestBody FindShiftInDayRequest request){
        return APIResponse.<List<String>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(shiftService.FindSlotbyDate(request))
                .build();

    }
}
