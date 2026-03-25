package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.AppointmentCreationRequest;
import quanly.kham_benh.Dto.response.AppointmentResponse;
import quanly.kham_benh.Entity.Appointment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    Appointment toAppointment(AppointmentCreationRequest request);
    AppointmentResponse toResponse(Appointment appointment);
    List<AppointmentResponse> toResponseList(List<Appointment> appointments);
}

