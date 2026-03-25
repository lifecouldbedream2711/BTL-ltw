package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.sql.Delete;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.Specialty;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.*;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.SpecialtyMapper;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class AdminService {

    UserRepository userRepository;
    UserMapper userMapper;

    public User CreateAdmin(UserCreationRequest request){
        User user= userMapper.toUser(request);

        user.set_active(true);
        user.setRole(String.valueOf(Role.ADMIN));
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));

        return userRepository.save(user);
    }

}
