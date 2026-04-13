package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Repository.*;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class AdminService {

    UserRepository userRepository;
    UserMapper userMapper;


    public User CreateAdmin(UserCreationRequest request){
        User user= userMapper.toUser(request);
        PasswordEncoder passwordEncoder =new BCryptPasswordEncoder(10);
        user.set_active(true);
        user.setRole(String.valueOf(Role.ADMIN));
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        user.setPassword_hash(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

}
