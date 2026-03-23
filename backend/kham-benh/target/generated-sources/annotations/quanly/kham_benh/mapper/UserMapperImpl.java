package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.request.UserUpdateRequest;
import quanly.kham_benh.Entity.Users;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-24T02:15:31+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public Users toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Users.UsersBuilder users = Users.builder();

        users.phone( request.getPhone() );
        users.full_name( request.getFull_name() );
        users.email( request.getEmail() );

        return users.build();
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

    @Override
    public Users toUser(PatientCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Users.UsersBuilder users = Users.builder();

        users.phone( request.getPhone() );
        users.full_name( request.getFull_name() );
        users.email( request.getEmail() );

        return users.build();
    }

    @Override
    public Users toUser(DoctorCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Users.UsersBuilder users = Users.builder();

        users.phone( request.getPhone() );
        users.full_name( request.getFull_name() );
        users.email( request.getEmail() );
        users.password_hash( request.getPassword_hash() );

        return users.build();
    }
}
