package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.MedicalRecordCreationRequest;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.MedicalRecordResponse;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Entity.MedicalRecord;
import quanly.kham_benh.Entity.Shift;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MedicalRecordMapper {
    MedicalRecord toEntity(MedicalRecordCreationRequest request);
    MedicalRecordResponse toResponse(MedicalRecord medicalRecord);
}

