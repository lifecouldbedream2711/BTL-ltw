package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.AddManyDoctorRequest;
import quanly.kham_benh.Dto.request.AddManyPatientRequest;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.request.PatientCreationRequest;

import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Interface.PatientInfoProjection;
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
    public PatientInfoProjection getPatientInfoById(String id) {
        return patientProfileRepository.findPatientInfoById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy patient"));
    }
    public List<PatientResponse> CreateMany(AddManyPatientRequest request){
        List<PatientResponse> result=new ArrayList<>();
        request.getPatientList().forEach(
                item -> result.add(createPatient(item)));
        return result;

    }
    public PatientResponse UpdatePatient(String id, PatientCreationRequest request){
        User user=userRepository.findById(id).orElseThrow(
                ()->new AppException(ErrorCode.USER_NOT_FOUND)
        );

        PatientProfile patientProfile=patientProfileRepository.findById(id).orElseThrow(
                ()->new AppException(ErrorCode.DOCTOR_NOT_FOUND)
        );
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setFull_name(request.getFull_name());
        user.setPassword_hash(passwordEncoder.encode(request.getPassword()));
        patientProfile.setDob(request.getDob());
        patientProfile.setGender(patientProfile.getGender());
        patientProfile.setAddress(request.getAddress());
        patientProfile.setAllergies(request.getAllergies());
        patientProfile.setMedical_history(request.getMedical_history());
        return patientMapper.toPatientResponse(patientProfileRepository.save(patientProfile),
                userRepository.save(user));
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

