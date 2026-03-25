package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.PatientCreationRequest;

import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.PatientRepository;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.PatientMapper;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PatientService {
    UserRepository userRepository;
    PatientRepository patientProfileRepository;
    PasswordEncoder passwordEncoder;
    PatientMapper patientMapper;
    UserMapper userMapper;
    public PatientResponse createPatient(PatientCreationRequest request) {
        if(userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTSED);


        User user = userMapper.toUser(request);
        user.set_active(true);
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        user.setRole(String.valueOf(Role.PATIENT));
        user.setPassword_hash(passwordEncoder.encode(request.getPassword()));



        // 2️⃣ Tạo PatientProfile và gắn User
        PatientProfile patientProfile = patientMapper.toPatientProfile(request);
        patientProfile.setUser(user); // MapsId sẽ dùng user.id

        user.setPatientProfile(patientProfile);
        userRepository.save(user);

        return patientMapper.toPatientResponse(patientProfile,user);
    }
    public List<PatientResponse> GetAllPatient(){
        List<PatientProfile> patientProfileList= patientProfileRepository.findAll();
        List<PatientResponse> result=new ArrayList<>();

        patientProfileList.forEach(item ->
        result.add(patientMapper.toPatientResponse(item,userRepository.findById(item.getUser_id())
                        .orElseThrow())));

        return result;
    }

}

