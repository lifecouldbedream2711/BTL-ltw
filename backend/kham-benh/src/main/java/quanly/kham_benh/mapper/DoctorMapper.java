package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.User;

@Mapper(componentModel = "spring")
public interface DoctorMapper {
    @Mapping(target = "id", source = "user.id")
    DoctorResponse toDoctorResponse(DoctorProfile patientProfile, User user);
    DoctorProfile toDoctorProfile(DoctorCreationRequest request);
}
