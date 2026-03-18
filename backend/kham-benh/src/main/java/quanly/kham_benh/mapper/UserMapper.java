package quanly.kham_benh.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.request.UserUpdateRequest;
import quanly.kham_benh.Entity.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
    Users toUser(UserCreationRequest request);
    void UpdateUser(@MappingTarget Users users, UserUpdateRequest request);
}
