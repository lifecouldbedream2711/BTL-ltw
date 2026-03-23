package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.Users;

@Mapper(componentModel = "spring")
public interface DoctorMapper {
    DoctorResponse toDoctorResponse(DoctorProfile patientProfile, Users users);
    DoctorProfile toDoctorProfile(DoctorCreationRequest request);
}
