package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Entity.Users;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    PatientResponse toPatientResponse(PatientProfile patientProfile, Users users);
    PatientProfile toPatientProfile(PatientCreationRequest request);
}
