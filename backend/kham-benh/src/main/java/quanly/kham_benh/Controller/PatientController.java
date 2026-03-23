package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.PatientCreationRequest;

import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Service.PatientService;


@RestController
@RequestMapping("/patient")
@Tag(name = "Patient API", description = "Các API quản lý Patient")
public class PatientController {

    @Autowired
    PatientService patientService;

    @PostMapping("/create")
    public APIResponse<PatientResponse> CreatePatient(@RequestBody PatientCreationRequest request){
        return APIResponse.<PatientResponse>builder()
                .message("Create patient success")
                .code(200)
                .result(patientService.createPatient(request))
                .build();
    }
}
