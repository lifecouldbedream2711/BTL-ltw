package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.request.UserCreationRequest;
import quanly.kham_benh.Dto.request.UserUpdateRequest;
import quanly.kham_benh.Entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-25T17:49:54+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.phone( request.getPhone() );
        user.full_name( request.getFull_name() );
        user.email( request.getEmail() );

        return user.build();
    }

    @Override
    public void UpdateUser(User user, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        user.setPhone( request.getPhone() );
        user.setFull_name( request.getFull_name() );
        user.setEmail( request.getEmail() );
        user.set_active( request.is_active() );
    }

    @Override
    public User toUser(PatientCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.phone( request.getPhone() );
        user.full_name( request.getFull_name() );
        user.email( request.getEmail() );

        return user.build();
    }

    @Override
    public User toUser(DoctorCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.phone( request.getPhone() );
        user.full_name( request.getFull_name() );
        user.email( request.getEmail() );
        user.password_hash( request.getPassword_hash() );

        return user.build();
    }
}
