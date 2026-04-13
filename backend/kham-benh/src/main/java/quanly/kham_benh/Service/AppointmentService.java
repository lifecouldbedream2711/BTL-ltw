package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.AppointmentCreationRequest;
import quanly.kham_benh.Dto.request.AppointmentSearchRequest;
import quanly.kham_benh.Dto.request.AppointmentStatusRequest;
import quanly.kham_benh.Dto.response.AppointmentResponse;
import quanly.kham_benh.Entity.Appointment;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.*;
import quanly.kham_benh.enums.AppointmentStatus;
import quanly.kham_benh.mapper.AppointmentMapper;
import quanly.kham_benh.mapper.SpecialtyMapper;

import java.time.LocalTime;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class AppointmentService {
    AppointmentRepository appointmentRepository;
    AppointmentMapper appointmentMapper;
    ShiftRepository shiftRepository;
    PatientRepository patientRepository;
    UserRepository userRepository;
    MedicalServiceRepository medicalServiceRepository;
    SpecialtyRepository specialtyRepository;
    SpecialtyMapper specialtyMapper;
    DoctorRepository doctorRepository;



    public AppointmentResponse CreateAppointment(AppointmentCreationRequest request){

        if (!patientRepository.existsById(request.getPatientId()))
            throw new AppException(ErrorCode.PATIENT_NOT_FOUND);
        if (!medicalServiceRepository.existsById(request.getServiceId()))
            throw new AppException(ErrorCode.SERVICE_NOT_EXISTSED);
        if (!shiftRepository.existsById(request.getShiftId()))
            throw new AppException(ErrorCode.SHIFT_NOT_FOUND);
        List<Appointment> appointmentList=appointmentRepository.findByShiftId(request.getShiftId());
        appointmentList.forEach(
                item -> {
                    if (((isBetween(request.getStartAt(), item.getStartAt(),item.getEndAt())
                    ||isBetween(request.getEndAt(), item.getStartAt(),item.getEndAt()))
                            &&(item.getStatus()== String.valueOf(AppointmentStatus.CONFIRMED)
                            ||item.getStatus()== String.valueOf(AppointmentStatus.CHECKED_IN))))
                        throw new AppException(ErrorCode.APPOINTMENT_TIME_REGISTED);
                });

        Appointment appointment = appointmentMapper.toAppointment(request);

        return appointmentMapper.toResponse(appointmentRepository.save(appointment));
    }

    public List<AppointmentResponse> GetAllAppointment(){
        List<Appointment> appointmentList=appointmentRepository.findAll();

        return appointmentMapper.toResponseList(appointmentList);
    }
    public List<AppointmentResponse> SearchAppointment(AppointmentSearchRequest request){
        List<Appointment> appointmentList=appointmentRepository.searchAdvanced(
                request.getPatientName(),
                request.getDoctorName(),
                request.getFromDate(),
                request.getToDate(),
                request.getFromTime(),
                request.getToTime(),
                request.getServiceId(),
                request.getStatus()
        );

        return appointmentMapper.toResponseList(appointmentList);
    }
    public AppointmentResponse UpdateAppointment(String id, AppointmentStatusRequest request){
        Appointment  appointment= appointmentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.APPOINTMENT_NOT_FOUND));
        List<Appointment> appointmentList=appointmentRepository.findByShiftId(appointment.getShiftId());
        appointmentList.forEach(
                item -> {
                    if (((isBetween(appointment.getStartAt(), item.getStartAt(),item.getEndAt())
                            ||isBetween(appointment.getEndAt(), item.getStartAt(),item.getEndAt()))
                            &&(item.getStatus()== String.valueOf(AppointmentStatus.CONFIRMED)
                            ||item.getStatus()== String.valueOf(AppointmentStatus.CHECKED_IN))))
                        throw new AppException(ErrorCode.APPOINTMENT_TIME_REGISTED);
                });


        appointment.setStatus(request.getStatus());
        return appointmentMapper.toResponse(appointmentRepository.save(appointment));
    }
    public List<AppointmentResponse> GetAppointmentByStatus(String status){
        List<Appointment> appointmentList=appointmentRepository.findByStatus(status);

        return appointmentMapper.toResponseList(appointmentList);
    }
    public AppointmentResponse getAppointmentById(String id){
        Appointment appointment=appointmentRepository.findById(id).orElseThrow(
                ()-> new AppException(ErrorCode.APPOINTMENT_NOT_FOUND)
        );
        return appointmentMapper.toResponse(appointment);
    }
    public List<AppointmentResponse> GetAppointmentByDoctor(String status){
        DoctorProfile doctorProfile=doctorRepository.findById(status).orElseThrow(
                ()->new AppException(ErrorCode.DOCTOR_NOT_FOUND)
        );

        List<Appointment> appointmentList=appointmentRepository.findByShiftId(status);

        return appointmentMapper.toResponseList(appointmentList);
    }
    public List<AppointmentResponse> GetAppointmentByPaitient(String id){
        List<Appointment> appointmentList=appointmentRepository.findByPatientId(id);

        return appointmentMapper.toResponseList(appointmentList);
    }
    public boolean isBetween(LocalTime target, LocalTime start, LocalTime end) {
        return !target.isBefore(start) && !target.isAfter(end);
    }
}

