package quanly.kham_benh.Controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/Admin")
@Tag(name = "Admin API", description = "Các API quản lý Admin")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AdminController {

    AdminService adminService;

    @PostMapping("/create")
    public APIResponse<User> CreateAdmin(@RequestBody UserCreationRequest request){

        return APIResponse.<User>builder()
                .message("Create Admin success     ")
                .code(200)
                .result(adminService.CreateAdmin(request))
                .build();
    }
}
