package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.Users;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.DoctorRepository;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.DoctorMapper;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;


@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Service
public class DoctorService {

    UserRepository userRepository;
    UserMapper userMapper;
    DoctorRepository doctorRepository;
    DoctorMapper doctorMapper;
    PasswordEncoder passwordEncoder;

    public DoctorResponse CreateDoctor(DoctorCreationRequest request){
        if(userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTSED);


        Users user = userMapper.toUser(request);
        user.set_active(true);
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        user.setRole(String.valueOf(Role.PATIENT));
        user.setPassword_hash(passwordEncoder.encode(request.getPassword_hash()));


        // Lưu User để có UUID
        user = userRepository.save(user);

        DoctorProfile doctorProfile=doctorMapper.toDoctorProfile(request);
        doctorProfile.setUser(user);

        doctorRepository.save(doctorProfile);

        user.setDoctorProfile(doctorProfile);
        userRepository.save(user);
        return doctorMapper.toDoctorResponse(doctorProfile,user);
    }

    
}
