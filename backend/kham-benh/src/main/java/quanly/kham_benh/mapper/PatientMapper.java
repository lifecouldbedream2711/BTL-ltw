package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Entity.User;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    @Mapping(target = "id", source = "user.id")
    PatientResponse toPatientResponse(PatientProfile patientProfile, User user);
    PatientProfile toPatientProfile(PatientCreationRequest request);
}
