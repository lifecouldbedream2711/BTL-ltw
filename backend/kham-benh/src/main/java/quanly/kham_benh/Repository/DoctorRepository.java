package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.DoctorProfile;
import quanly.kham_benh.Interface.DoctorInfoProjection;
import quanly.kham_benh.Interface.TopDoctorProjection;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository  extends JpaRepository<DoctorProfile,String> {
    Optional<DoctorProfile> findById(String id);
    boolean existsById(String s);
    List<DoctorProfile> findBySpecialtyId(String specialtyId);
    @Query(value = """
SELECT TOP 5 
    u.id AS doctorId,
    u.full_name AS doctorName,
    COUNT(a.id) AS totalAppointments
FROM appointments a
JOIN doctor_shifts ds ON a.shift_id = ds.id
JOIN users u ON ds.doctor_id = u.id
WHERE u.role = 'DOCTOR'
  AND a.status IN ('CONFIRMED','DONE') -- optional (lọc lịch hợp lệ)
GROUP BY u.id, u.full_name
ORDER BY totalAppointments DESC
""", nativeQuery = true)
    List<TopDoctorProjection> getTopDoctors();
    @Query(value = """
    SELECT 
        d.id, 
        d.phone, 
        d.full_name, 
        d.email, 
        d.password_hash, 
        dp.license_no, 
        dp.bio,
        dp.specialty_id
    FROM users d
    JOIN doctor_profiles dp ON d.id = dp.user_id
    WHERE (:doctorName IS NULL OR d.full_name COLLATE Latin1_General_CI_AI LIKE CONCAT('%', :doctorName, '%'))
    """, nativeQuery = true)
    List<Object[]> findDoctorNative(@Param("doctorName") String doctorName);

    // DoctorRepository.java
    @Query(value = """
    SELECT
        u.id              AS id,
        u.full_name       AS fullName,
        u.email           AS email,
        u.phone           AS phone,
        u.role            AS role,
        u.is_active       AS isActive,
        u.created_at      AS createdAt,
        d.specialty_id    AS specialtyId,
        s.name            AS specialtyName,
        d.license_no      AS licenseNo,
        d.bio             AS bio
    FROM users u
    LEFT JOIN doctor_profiles d ON d.user_id = u.id
    LEFT JOIN specialties s ON s.id = d.specialty_id
    WHERE u.role = 'DOCTOR'
      AND u.id = :id
    """, nativeQuery = true)
    Optional<DoctorInfoProjection> findDoctorInfoById(@Param("id") String id);
}
