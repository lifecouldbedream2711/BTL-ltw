package quanly.kham_benh.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Entity.Users;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.mapper.UserMapper;

import java.util.List;


@Service
public class UserService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    public Users createUser(UserCreationRequest request){

        if(userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTSED);

        Users user= userMapper.toUser(request);
        PasswordEncoder passwordEncoder =new BCryptPasswordEncoder(10);
        user.setPassword_hash(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    public List<Users> getAllUser(){
        return userRepository.findAll();
    }
    public Users getUser(String id){
        return userRepository.findById(id).orElseThrow();
    }
}
