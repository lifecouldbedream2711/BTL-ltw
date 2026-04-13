package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.MedicalRecordCreationRequest;
import quanly.kham_benh.Dto.response.MedicalRecordResponse;
import quanly.kham_benh.Entity.MedicalRecord;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class MedicalRecordMapperImpl implements MedicalRecordMapper {

    @Override
    public MedicalRecord toEntity(MedicalRecordCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        MedicalRecord.MedicalRecordBuilder medicalRecord = MedicalRecord.builder();

        medicalRecord.appointmentId( request.getAppointmentId() );
        medicalRecord.symptoms( request.getSymptoms() );
        medicalRecord.diagnosis( request.getDiagnosis() );
        medicalRecord.notes( request.getNotes() );

        return medicalRecord.build();
    }

    @Override
    public MedicalRecordResponse toResponse(MedicalRecord medicalRecord) {
        if ( medicalRecord == null ) {
            return null;
        }

        MedicalRecordResponse.MedicalRecordResponseBuilder medicalRecordResponse = MedicalRecordResponse.builder();

        medicalRecordResponse.id( medicalRecord.getId() );
        medicalRecordResponse.appointmentId( medicalRecord.getAppointmentId() );
        medicalRecordResponse.symptoms( medicalRecord.getSymptoms() );
        medicalRecordResponse.diagnosis( medicalRecord.getDiagnosis() );
        medicalRecordResponse.notes( medicalRecord.getNotes() );

        return medicalRecordResponse.build();
    }
}
