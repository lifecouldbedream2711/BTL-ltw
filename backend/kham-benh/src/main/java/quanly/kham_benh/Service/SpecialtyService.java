package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.AddSpecialtyRequest;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.response.AddSpecialtyResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.DoctorProfile;
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
public class SpecialtyService {
    UserRepository userRepository;
    SpecialtyRepository specialtyRepository;
    SpecialtyMapper specialtyMapper;
    DoctorRepository doctorRepository;
    public SpecialtyResponse CreateSpecialty(SpecialtyCreationRequest request){
        Specialty specialty= specialtyMapper.toSpecialty(request);
        if (specialtyRepository.existsByName(request.getName()))
            throw new AppException(ErrorCode.SPECIALTY_EXISTSED);


        return specialtyMapper.toResponse(specialtyRepository.save(specialty));
    }
    public SpecialtyResponse UpdateSpecialty(String id,SpecialtyCreationRequest request){
        Specialty specialty= specialtyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SPECIALTY_NOT_FOUND));
        boolean check= specialtyRepository.existsByName(request.getName());
            specialty.setDescription(request.getDescription());

            specialty = specialtyRepository.save(specialty);
        return specialtyMapper.toResponse(specialty);
    }
    public String DeleteSpecialty(String id){
        Specialty specialty= specialtyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SPECIALTY_NOT_FOUND));

        specialtyRepository.delete(specialty);
        return "Xóa khoa thành công";
    }
    public List<SpecialtyResponse> GetAllSpecialty(){
        List<Specialty> specialtyList= specialtyRepository.findAll();
        List<SpecialtyResponse> result = new ArrayList<>();

        specialtyList.forEach(item -> {
            result.add(specialtyMapper.toResponse(item));
        });
        return result;
    }
    public AddSpecialtyResponse AddSpecialty(AddSpecialtyRequest request){
        DoctorProfile doctorProfile = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        Specialty specialty=specialtyRepository.findById(request.getSpecialtyId())
                .orElseThrow(()-> new AppException(ErrorCode.SPECIALTY_EXISTSED));
        User user=userRepository.findById(request.getDoctorId())
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        doctorProfile.setSpecialty_id(specialty.getId());

        doctorProfile.setSpecialty_id(request.getSpecialtyId());
        doctorRepository.save(doctorProfile);

        return AddSpecialtyResponse.builder()
                .SpecialtyName(specialty.getName())
                .DoctorName(user.getFull_name())
                .build();
    }

}
