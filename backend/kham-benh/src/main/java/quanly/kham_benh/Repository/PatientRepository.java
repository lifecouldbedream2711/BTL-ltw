package quanly.kham_benh.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.PatientProfile;
import quanly.kham_benh.Interface.PatientInfoProjection;
import quanly.kham_benh.Interface.PatientStatsProjection;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<PatientProfile,String> {
    @Query(value = """
    SELECT 
        u.id                AS id,
        u.full_name         AS fullName,
        u.email             AS email,
        u.phone             AS phone,
        u.role              AS role,
        u.is_active         AS isActive,
        u.created_at        AS createdAt,
        p.dob               AS dob,
        p.gender            AS gender,
        p.address           AS address,
        p.allergies         AS allergies,
        p.medical_history   AS medicalHistory
    FROM users u
    LEFT JOIN patient_profiles p ON p.user_id = u.id
    WHERE u.role = 'PATIENT'
      AND u.id = :id
    """, nativeQuery = true)
    Optional<PatientInfoProjection> findPatientInfoById(@Param("id") String id);
    @Query(value = """
SELECT 
    COUNT(CASE 
        WHEN created_at >= DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)
        THEN 1 END) AS currentMonth,

    COUNT(CASE 
        WHEN created_at >= DATEADD(MONTH, -1, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1))
         AND created_at < DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)
        THEN 1 END) AS previousMonth
FROM users
WHERE role = 'PATIENT'
""", nativeQuery = true)
    PatientStatsProjection getPatientStats();
}
