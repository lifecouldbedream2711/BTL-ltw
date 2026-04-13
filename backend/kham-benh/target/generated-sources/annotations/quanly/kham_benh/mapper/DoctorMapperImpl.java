package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public DoctorResponse toDoctorResponse(DoctorProfile patientProfile, User user) {
        if ( patientProfile == null && user == null ) {
            return null;
        }

        DoctorResponse.DoctorResponseBuilder doctorResponse = DoctorResponse.builder();

        if ( patientProfile != null ) {
            doctorResponse.specialtyId( patientProfile.getSpecialtyId() );
            doctorResponse.license_no( patientProfile.getLicense_no() );
            doctorResponse.bio( patientProfile.getBio() );
        }
        if ( user != null ) {
            doctorResponse.id( user.getId() );
            doctorResponse.phone( user.getPhone() );
            doctorResponse.full_name( user.getFull_name() );
            doctorResponse.email( user.getEmail() );
            doctorResponse.password_hash( user.getPassword_hash() );
        }

        return doctorResponse.build();
    }

    @Override
    public DoctorProfile toDoctorProfile(DoctorCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        DoctorProfile.DoctorProfileBuilder doctorProfile = DoctorProfile.builder();

        doctorProfile.license_no( request.getLicense_no() );
        doctorProfile.bio( request.getBio() );

        return doctorProfile.build();
    }
}
