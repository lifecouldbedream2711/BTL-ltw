package quanly.kham_benh.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Entity.Users;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class AdminService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    public Users CreateAdmin(UserCreationRequest request){
        Users user= userMapper.toUser(request);

        user.set_active(true);
        user.setRole(String.valueOf(Role.ADMIN));
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));

        return userRepository.save(user);
    }

}
