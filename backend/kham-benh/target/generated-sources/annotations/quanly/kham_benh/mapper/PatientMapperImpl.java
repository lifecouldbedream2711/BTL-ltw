package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.PatientCreationRequest;
import quanly.kham_benh.Dto.response.PatientResponse;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class PatientMapperImpl implements PatientMapper {

    @Override
    public PatientResponse toPatientResponse(PatientProfile patientProfile, User user) {
        if ( patientProfile == null && user == null ) {
            return null;
        }

        PatientResponse.PatientResponseBuilder patientResponse = PatientResponse.builder();

        if ( patientProfile != null ) {
            patientResponse.dob( patientProfile.getDob() );
            patientResponse.gender( patientProfile.getGender() );
            patientResponse.address( patientProfile.getAddress() );
            patientResponse.allergies( patientProfile.getAllergies() );
            patientResponse.medical_history( patientProfile.getMedical_history() );
        }
        if ( user != null ) {
            patientResponse.id( user.getId() );
            patientResponse.phone( user.getPhone() );
            patientResponse.full_name( user.getFull_name() );
            patientResponse.email( user.getEmail() );
            patientResponse.password_hash( user.getPassword_hash() );
        }

        return patientResponse.build();
    }

    @Override
    public PatientProfile toPatientProfile(PatientCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        PatientProfile.PatientProfileBuilder patientProfile = PatientProfile.builder();

        patientProfile.dob( request.getDob() );
        patientProfile.gender( request.getGender() );
        patientProfile.address( request.getAddress() );
        patientProfile.allergies( request.getAllergies() );
        patientProfile.medical_history( request.getMedical_history() );

        return patientProfile.build();
    }
}
