package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.AddSpecialtyRequest;
import quanly.kham_benh.Dto.request.MedicalRecordCreationRequest;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.response.AddSpecialtyResponse;
import quanly.kham_benh.Dto.response.MedicalRecordResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.MedicalRecord;
import quanly.kham_benh.Entity.Specialty;
import quanly.kham_benh.Entity.User;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.DoctorRepository;
import quanly.kham_benh.Repository.MedicalRecordRepository;
import quanly.kham_benh.Repository.SpecialtyRepository;
import quanly.kham_benh.Repository.UserRepository;
import quanly.kham_benh.mapper.MedicalRecordMapper;
import quanly.kham_benh.mapper.SpecialtyMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class MedicalRecordService {

    MedicalRecordMapper medicalRecordMapper;
    MedicalRecordRepository medicalRecordRepository;


    public MedicalRecordResponse CreateMedicalRecord(MedicalRecordCreationRequest request){
        MedicalRecord medicalRecord=medicalRecordMapper.toEntity(request);

        return medicalRecordMapper.toResponse(medicalRecordRepository.save(medicalRecord));
    }
    public MedicalRecordResponse GetMedicalRecord(String id){
        MedicalRecord medicalRecord=medicalRecordRepository.findByAppointmentId(id)
                .orElseThrow(()->new AppException(ErrorCode.RECORD_NOT_FOUND));

        return medicalRecordMapper.toResponse(medicalRecord);
    }


}
