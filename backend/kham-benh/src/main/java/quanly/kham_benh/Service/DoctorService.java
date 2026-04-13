package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.AddManyDoctorRequest;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Interface.DoctorInfoProjection;
import quanly.kham_benh.Repository.DoctorRepository;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.enums.Role;
import quanly.kham_benh.mapper.DoctorMapper;
import quanly.kham_benh.mapper.UserMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


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

        User user = userMapper.toUser(request);
        user.set_active(true);
        user.setCreated_at(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        user.setRole(String.valueOf(Role.DOCTOR));
        user.setPassword_hash(passwordEncoder.encode(request.getPassword_hash()));

        DoctorProfile doctorProfile=doctorMapper.toDoctorProfile(request);
        doctorProfile.setUser(user);

        user.setDoctorProfile(doctorProfile);
        userRepository.save(user);
        return doctorMapper.toDoctorResponse(doctorProfile,user);
    }
    public List<DoctorResponse> CreateMany(AddManyDoctorRequest request){
        List<DoctorResponse> result=new ArrayList<>();
        request.getDoctorList().forEach(
                item -> result.add(CreateDoctor(item)));
        return result;

    }
    // DoctorService.java
    public DoctorInfoProjection getDoctorInfoById(String id) {
        return doctorRepository.findDoctorInfoById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy doctor"));
    }

    public DoctorResponse UpdateDoctor(String id,DoctorCreationRequest request){
        User user=userRepository.findById(id).orElseThrow(
                ()->new AppException(ErrorCode.USER_NOT_FOUND)
        );
        DoctorProfile doctorProfile=doctorRepository.findById(id).orElseThrow(
                ()->new AppException(ErrorCode.DOCTOR_NOT_FOUND)
        );
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setFull_name(request.getFull_name());
        user.setPassword_hash(passwordEncoder.encode(request.getPassword_hash()));
        doctorProfile.setBio(request.getBio());
        doctorProfile.setLicense_no(request.getLicense_no());
        return doctorMapper.toDoctorResponse(doctorRepository.save(doctorProfile),
                userRepository.save(user));
    }

    public List<DoctorResponse> GetAllDoctor(){
        List<DoctorProfile> doctorProfileList= doctorRepository.findAll();
        List<DoctorResponse> result=new ArrayList<>();

        doctorProfileList.forEach(item ->
                result.add(doctorMapper.toDoctorResponse(item,userRepository.findById(item.getId())
                        .orElseThrow())));
        return result;
    }
    public List<DoctorResponse> GetDoctorBySpecialty(String id){
        List<DoctorProfile> doctorProfileList= doctorRepository.findBySpecialtyId(id);
        List<DoctorResponse> result=new ArrayList<>();

        doctorProfileList.forEach(item ->
                result.add(doctorMapper.toDoctorResponse(item,userRepository.findById(item.getId())
                        .orElseThrow())));
        return result;
    }
    public List<DoctorResponse> GetDoctorByName(String name){
        List<Object[]> results = doctorRepository.findDoctorNative(name);
        return results.stream().map(row -> DoctorResponse.builder()
                .id((String) row[0])
                .phone((String) row[1])
                .full_name((String) row[2])
                .email((String) row[3])
                .password_hash((String) row[4])
                .license_no((String) row[5])
                .bio((String) row[6])
                .specialtyId((String) row[7])   // thêm dòng này
                .build()
        ).toList();
    }

    
}
