package quanly.kham_benh.Controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Entity.Users;
import quanly.kham_benh.Service.AdminService;

@RestController
@RequestMapping("/Admin")
@Tag(name = "Admin API", description = "Các API quản lý user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AdminController {

    AdminService adminService;

    @PostMapping("/create")
    public APIResponse<Users> CreateAdmin(@RequestBody UserCreationRequest request){

        return APIResponse.<Users>builder()
                .message("Create Admin success     ")
                .code(200)
                .result(adminService.CreateAdmin(request))
                .build();
    }
}
