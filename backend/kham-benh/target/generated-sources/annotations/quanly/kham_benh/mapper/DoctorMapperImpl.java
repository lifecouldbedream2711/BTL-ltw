package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.DoctorCreationRequest;
import quanly.kham_benh.Dto.response.DoctorResponse;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Entity.Users;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-24T02:15:31+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public DoctorResponse toDoctorResponse(DoctorProfile patientProfile, Users users) {
        if ( patientProfile == null && users == null ) {
            return null;
        }

        DoctorResponse.DoctorResponseBuilder doctorResponse = DoctorResponse.builder();

        if ( patientProfile != null ) {
            doctorResponse.license_no( patientProfile.getLicense_no() );
            doctorResponse.bio( patientProfile.getBio() );
        }
        if ( users != null ) {
            doctorResponse.phone( users.getPhone() );
            doctorResponse.full_name( users.getFull_name() );
            doctorResponse.email( users.getEmail() );
            doctorResponse.password_hash( users.getPassword_hash() );
        }

        return doctorResponse.build();
    }

    @Override
    public DoctorProfile toDoctorProfile(DoctorCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        DoctorProfile doctorProfile = new DoctorProfile();

        doctorProfile.setLicense_no( request.getLicense_no() );
        doctorProfile.setBio( request.getBio() );

        return doctorProfile;
    }
}
