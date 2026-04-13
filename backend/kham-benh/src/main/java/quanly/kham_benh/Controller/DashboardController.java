package quanly.kham_benh.Controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.*;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Service.AdminService;
import quanly.kham_benh.Service.DashboardService;

import java.util.List;

@RestController
@RequestMapping("/Dashboard")
@Tag(name = "Dashboard API", description = "Các API quản lý Dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class DashboardController {
    DashboardService dashboardService;

    @GetMapping("/Get-all")
    public APIResponse<AllQuantityResponse> GetAllQuantity(){
        return APIResponse.<AllQuantityResponse>builder()
                .code(200)
                .message("Get all Quantity success")
                .result(dashboardService.GetAllQuantity())
                .build();
    }
    @GetMapping("/dashboard/patients")
    public APIResponse<UserStatsResponse> getPatientStats() {
        return APIResponse.<UserStatsResponse>builder()
                .code(200)
                .message("Get user stat success")
                .result(dashboardService.getUserStats())
                .build();
    }
    @GetMapping("/dashboard/top-doctors")
    public List<TopDoctorResponse> getTopDoctors() {
        return dashboardService.getTopDoctors();
    }


    @GetMapping("/appointments/status-count")
    public APIResponse<List<AppointmentStatusCountResponse>> getAppointmentCountByStatus() {
        return APIResponse.<List<AppointmentStatusCountResponse>>builder()
                .code(200)
                .message("Get Appointment count success")
                .result(dashboardService.getAppointmentCountByStatus())
                .build();

    }
}
