package quanly.kham_benh.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.request.UserUpdateRequest;
import quanly.kham_benh.Entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);
    void UpdateUser(@MappingTarget User user, UserUpdateRequest request);
    User toUser(PatientCreationRequest request);
    User toUser(DoctorCreationRequest request);
}
