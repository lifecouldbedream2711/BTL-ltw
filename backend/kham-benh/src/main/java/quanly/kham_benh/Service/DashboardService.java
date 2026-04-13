package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.response.AllQuantityResponse;
import quanly.kham_benh.Dto.response.AppointmentStatusCountResponse;
import quanly.kham_benh.Dto.response.TopDoctorResponse;
import quanly.kham_benh.Dto.response.UserStatsResponse;
import quanly.kham_benh.Interface.PatientStatsProjection;
import quanly.kham_benh.Repository.*;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class DashboardService {
    String[] lsStatus = {"PENDING","CONFIRMED","CHECKED_IN","DONE","CANCELED","NO_SHOW"};
    PatientRepository patientRepository;
    DoctorRepository doctorRepository;
    AppointmentRepository appointmentRepository;
    MedicalServiceRepository medicalServiceRepository;
    SpecialtyRepository specialtyRepository;
    AppointmentService appointmentService;


    public AllQuantityResponse GetAllQuantity(){
        return AllQuantityResponse.builder()
                .totalAppointment(appointmentRepository.count())
                .totalDoctor(doctorRepository.count())
                .totalPatient(patientRepository.count())
                .totalSpecialty(specialtyRepository.count())
                .totalService(medicalServiceRepository.count())
                .build();
    }

    public UserStatsResponse getUserStats() {
        PatientStatsProjection data = patientRepository.getPatientStats();

        int current = data.getCurrentMonth();
        int previous = data.getPreviousMonth();

        int diff = current - previous;

        double percent = 0;
        if (previous != 0) {
            percent = (diff * 100.0) / previous;
        }

        return UserStatsResponse.builder()
                .currentMonth(current)
                .previousMonth(previous)
                .difference(diff)
                .percentChange(percent)
                .build();
    }
    public List<TopDoctorResponse> getTopDoctors() {
        return doctorRepository.getTopDoctors()
                .stream()
                .map(d -> TopDoctorResponse.builder()
                        .doctorId(d.getDoctorId())
                        .doctorName(d.getDoctorName())
                        .totalAppointments(d.getTotalAppointments())
                        .build())
                .toList();
    }
    public List<AppointmentStatusCountResponse> getAppointmentCountByStatus() {
        List<AppointmentStatusCountResponse> responses=new ArrayList<>();
        for (String status : lsStatus) {
            responses.add(
                    AppointmentStatusCountResponse.builder()
                            .status(status)
                            .total(appointmentRepository.countByStatus(status))
                            .build()
            );
        }
        return  responses;
    }
}
