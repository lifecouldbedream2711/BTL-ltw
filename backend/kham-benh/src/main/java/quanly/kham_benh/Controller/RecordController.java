package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.MedicalRecordCreationRequest;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.MedicalRecordResponse;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Service.MedicalRecordService;
import quanly.kham_benh.Service.ShiftService;

import java.util.List;


@RestController
@RequestMapping("/Medical-Record")
@Tag(name = "Medical-Record API", description = "Các API quản lý Medical-Record")
public class RecordController {

    @Autowired
    ShiftService shiftService;
    @Autowired
    MedicalRecordService medicalRecordService;
    @PostMapping("/create")
    public APIResponse<MedicalRecordResponse> CreatePatient(@RequestBody MedicalRecordCreationRequest request){
        return APIResponse.<MedicalRecordResponse>builder()
                .message("Create shift success")
                .code(200)
                .result(medicalRecordService.CreateMedicalRecord(request))
                .build();
    }
    @GetMapping("Get/{id}")
    public APIResponse<MedicalRecordResponse> GetDoctorShift(@PathVariable("id") String id){
        return APIResponse.<MedicalRecordResponse>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(medicalRecordService.GetMedicalRecord(id))
                .build();

    }
}
