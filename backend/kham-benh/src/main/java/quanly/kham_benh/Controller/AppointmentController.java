package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.AppointmentCreationRequest;
import quanly.kham_benh.Dto.request.AppointmentSearchRequest;
import quanly.kham_benh.Dto.request.AppointmentStatusRequest;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.AppointmentResponse;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Entity.Appointment;
import quanly.kham_benh.Repository.AppointmentRepository;
import quanly.kham_benh.Service.AppointmentService;
import quanly.kham_benh.Service.ShiftService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/appointment")
@Tag(name = "Appointment API", description = "Các API quản lý Đơn khám")
public class AppointmentController {

    @Autowired
    AppointmentRepository appointmentRepository;
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
    @GetMapping("Get-by-id/{id}")
    public APIResponse<AppointmentResponse> GetAppoinmentById(@PathVariable("id") String id){
        return APIResponse.<AppointmentResponse>builder()
                .message("Get Appointment success")
                .code(200)
                .result(appointmentService.getAppointmentById(id))
                .build();
    }
    @GetMapping("Get-all")
    public APIResponse<List<AppointmentResponse>> GetAllAppointment(){
        return APIResponse.<List<AppointmentResponse>>builder()
                .code(200)
                .message("Get appointment list success")
                .result(appointmentService.GetAllAppointment())
                .build();

    }
    @GetMapping("Get-by-status/{status}")
    public APIResponse<List<AppointmentResponse>> GetAppointment(@PathVariable("status")String request){
        return APIResponse.<List<AppointmentResponse>>builder()
                .code(200)
                .message("Get appointment list success")
                .result(appointmentService.GetAppointmentByStatus(request))
                .build();

    }

    @PutMapping("Update-status/{id}")
    public APIResponse<AppointmentResponse> UpdateAppointment(@PathVariable("id") String id,@RequestBody AppointmentStatusRequest request){
        return APIResponse.<AppointmentResponse>builder()
                .message("Update Appointment status success")
                .code(200)
                .result(appointmentService.UpdateAppointment(id,request))
                .build();
    }
    @GetMapping("Get-by-Patient/{id}")
    public APIResponse<List<AppointmentResponse>> GetAppointmentbyPatient(@PathVariable("id")String request){
        return APIResponse.<List<AppointmentResponse>>builder()
                .code(200)
                .message("Get appointment list success")
                .result(appointmentService.GetAppointmentByPaitient(request))
                .build();

    }
    @PostMapping("Search")
    public APIResponse<List<AppointmentResponse>> AppoitmentSearch(AppointmentSearchRequest request){
        return APIResponse.<List<AppointmentResponse>>builder()
                .code(200)
                .message("Get appointment list success")
                .result(appointmentService.SearchAppointment(request))
                .build();

    }
    @PostMapping("Create-many")
    public APIResponse<List<AppointmentResponse>> CreateMany(@RequestBody List<AppointmentCreationRequest> request){
        List<AppointmentResponse> responses=new ArrayList<>();
        request.forEach(
                item -> responses.add(appointmentService.CreateAppointment(item))
        );


        return APIResponse.<List<AppointmentResponse>>builder()
                .code(200)
                .message("Get appointment list success")
                .result(responses)
                .build();

    }
    @GetMapping("/doctor/{doctorId}")
    public APIResponse<List<Appointment>> getByDoctor(
            @PathVariable String doctorId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate shiftDate
    ) {
        return APIResponse.<List<Appointment>>builder()
                .code(200)
                .message("Get appointments success")
                .result(appointmentRepository.findByDoctorIdAndOptionalShiftDate(doctorId, shiftDate))
                .build();
    }
}
