package quanly.kham_benh.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.AppointmentCreationRequest;
import quanly.kham_benh.Dto.response.AppointmentResponse;
import quanly.kham_benh.Entity.Appointment;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Override
    public Appointment toAppointment(AppointmentCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Appointment.AppointmentBuilder appointment = Appointment.builder();

        appointment.patientId( request.getPatientId() );
        appointment.serviceId( request.getServiceId() );
        appointment.shiftId( request.getShiftId() );
        appointment.startAt( request.getStartAt() );
        appointment.endAt( request.getEndAt() );
        appointment.status( request.getStatus() );
        appointment.reason( request.getReason() );

        return appointment.build();
    }

    @Override
    public AppointmentResponse toResponse(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        AppointmentResponse.AppointmentResponseBuilder appointmentResponse = AppointmentResponse.builder();

        appointmentResponse.id( appointment.getId() );
        appointmentResponse.patientId( appointment.getPatientId() );
        appointmentResponse.serviceId( appointment.getServiceId() );
        appointmentResponse.shiftId( appointment.getShiftId() );
        appointmentResponse.status( appointment.getStatus() );
        appointmentResponse.reason( appointment.getReason() );
        appointmentResponse.createdAt( appointment.getCreatedAt() );
        appointmentResponse.startAt( appointment.getStartAt() );
        appointmentResponse.endAt( appointment.getEndAt() );

        return appointmentResponse.build();
    }

    @Override
    public List<AppointmentResponse> toResponseList(List<Appointment> appointments) {
        if ( appointments == null ) {
            return null;
        }

        List<AppointmentResponse> list = new ArrayList<AppointmentResponse>( appointments.size() );
        for ( Appointment appointment : appointments ) {
            list.add( toResponse( appointment ) );
        }

        return list;
    }
}
