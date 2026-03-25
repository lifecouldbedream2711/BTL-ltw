package quanly.kham_benh.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "User API", description = "Các API quản lý user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public APIResponse<User> createUser(@RequestBody UserCreationRequest request){

        return APIResponse.<User>builder().message("create user success")
                .code(200)
                .result( userService.createUser(request))
                .build();
    }

    @GetMapping("/login")
    public List<User> getAllUser(){

        return userService.getAllUser();
    }


    @GetMapping("/Get-user/{userId}")
    public User getUser(@PathVariable("userId") String id){

        return userService.getUser(id);
    }
}
