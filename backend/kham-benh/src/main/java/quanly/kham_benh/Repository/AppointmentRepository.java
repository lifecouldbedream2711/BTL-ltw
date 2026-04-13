package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,String> {
    Optional<Appointment> findById(String id);
    List<Appointment> findByShiftId(String id);
    List<Appointment> findByStatus(String status);
    List<Appointment> findByPatientId(String id);
    long countByStatus(String status);
    @Query(value = """
    SELECT a.*
    FROM appointments a
    JOIN doctor_shifts ds ON a.shift_id = ds.id
    JOIN users p ON a.patient_id = p.id
    JOIN doctor_profiles dp ON ds.doctor_id = dp.user_id
    JOIN users d ON dp.user_id = d.id
    WHERE 1=1

        --  Tìm theo tên bệnh nhân
        AND (:patientName IS NULL OR p.full_name COLLATE Latin1_General_CI_AI LIKE '%' + :patientName + '%')

        --  Tìm theo tên bác sĩ
        AND (:doctorName IS NULL OR d.full_name COLLATE Latin1_General_CI_AI LIKE '%' + :doctorName + '%')

        -- Theo ngày
        AND (:fromDate IS NULL OR ds.shift_date >= :fromDate)
        AND (:toDate IS NULL OR ds.shift_date <= :toDate)

        -- Theo giờ
        AND (:fromTime IS NULL OR a.start_at >= :fromTime)
        AND (:toTime IS NULL OR a.end_at <= :toTime)

        -- Theo dịch vụ
        AND (:serviceId IS NULL OR a.service_id = :serviceId)

        -- Theo trạng thái
        AND (:status IS NULL OR a.status = :status)

    ORDER BY ds.shift_date DESC, a.start_at ASC
""", nativeQuery = true)
    List<Appointment> searchAdvanced(
            @Param("patientName") String patientName,
            @Param("doctorName") String doctorName,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("fromTime") LocalTime fromTime,
            @Param("toTime") LocalTime toTime,
            @Param("serviceId") String serviceId,
            @Param("status") String status
    );
    @Query(value = """
    SELECT a.*
    FROM dbo.appointments a
    INNER JOIN dbo.doctor_shifts ds ON ds.id = a.shift_id
    WHERE ds.doctor_id = :doctorId
      AND (:shiftDate IS NULL OR ds.shift_date = :shiftDate)
    ORDER BY ds.shift_date DESC, a.start_at DESC
    """, nativeQuery = true)
    List<Appointment> findByDoctorIdAndOptionalShiftDate(
            @Param("doctorId") String doctorId,
            @Param("shiftDate") LocalDate shiftDate);
}
