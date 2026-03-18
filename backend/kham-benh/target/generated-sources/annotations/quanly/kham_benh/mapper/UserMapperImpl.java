package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.request.UserUpdateRequest;
import quanly.kham_benh.Entity.Users;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-18T15:42:37+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public Users toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Users users = new Users();

        users.setPhone( request.getPhone() );
        users.setFull_name( request.getFull_name() );
        users.setEmail( request.getEmail() );
        users.setRole( request.getRole() );
        users.set_active( request.is_active() );

        return users;
    }

    @Override
    public void UpdateUser(Users users, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        users.setPhone( request.getPhone() );
        users.setFull_name( request.getFull_name() );
        users.setEmail( request.getEmail() );
        users.set_active( request.is_active() );
    }
}
