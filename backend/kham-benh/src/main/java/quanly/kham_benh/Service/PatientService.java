package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.PatientCreationRequest;

import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Entity.Users;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.PatientRepository;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.PatientMapper;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

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


        Users user = userMapper.toUser(request);
        user.set_active(true);
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        user.setRole(String.valueOf(Role.PATIENT));
        user.setPassword_hash(passwordEncoder.encode(request.getPassword()));


        // Lưu User để có UUID
        user = userRepository.save(user);

        // 2️⃣ Tạo PatientProfile và gắn User
        PatientProfile patientProfile = PatientProfile.builder()
                .dob(request.getDob())
                .gender(request.getGender())
                .address(request.getAddress())
                .allergies(request.getAllergies())
                .medical_history(request.getMedical_history())
                .user(user) // MapsId sẽ dùng user.id
                .build();

        patientProfileRepository.save(patientProfile);

        user.setPatientProfile(patientProfile);
        userRepository.save(user);

        return patientMapper.toPatientResponse(patientProfile,user);
    }

}

