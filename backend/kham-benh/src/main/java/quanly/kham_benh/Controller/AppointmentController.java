package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.AppointmentCreationRequest;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.AppointmentResponse;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Service.AppointmentService;
import quanly.kham_benh.Service.ShiftService;

import java.util.List;


@RestController
@RequestMapping("/appointment")
@Tag(name = "Appointment API", description = "Các API quản lý Đơn khám")
public class AppointmentController {

    @Autowired
    ShiftService shiftService;
    @Autowired
    AppointmentService appointmentService;
    @PostMapping("/create")
    public APIResponse<AppointmentResponse> CreatePatient(@RequestBody AppointmentCreationRequest request){
        return APIResponse.<AppointmentResponse>builder()
                .message("Create Appointment success")
                .code(200)
                .result(appointmentService.CreateAppointment(request))
                .build();
    }
    @GetMapping("Get-all")
    public APIResponse<List<AppointmentResponse>> GetAllAppointment(){
        return APIResponse.<List<AppointmentResponse>>builder()
                .code(200)
                .message("lấy danh sách ca làm thành công")
                .result(appointmentService.GetAllAppointment())
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
