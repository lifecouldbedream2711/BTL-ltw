package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Specialty;
import quanly.kham_benh.Interface.SpecialtySummaryProjection;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty,String> {
    boolean existsByName(String name);
    Optional<Specialty> findByName(String name);
    @Query(value = """
    SELECT id, name, description
    FROM specialties
    WHERE name COLLATE Latin1_General_CI_AI LIKE '%' + :specialtyName + '%'
    """, nativeQuery = true)
    List<Specialty> findSpecialtyByName(@Param("specialtyName") String specialtyName);
    @Query(value = """
    SELECT
        s.id AS id,
        s.name AS name,
        s.description AS description,
        COUNT(DISTINCT d.user_id) AS doctorsCount,
        COUNT(DISTINCT sv.id) AS servicesCount
    FROM specialties s
    LEFT JOIN doctor_profiles d ON d.specialty_id = s.id
    LEFT JOIN services sv ON sv.specialty_id = s.id
    WHERE s.name COLLATE Latin1_General_CI_AI LIKE '%' + :name + '%'
    GROUP BY s.id, s.name, s.description
    ORDER BY s.name
    """, nativeQuery = true)
    List<SpecialtySummaryProjection> searchSummaryByName(@Param("name") String name);
    @Query(value = """
    SELECT
        s.id AS id,
        s.name AS name,
        s.description AS description,
        COUNT(DISTINCT d.user_id) AS doctorsCount,
        COUNT(DISTINCT sv.id) AS servicesCount
    FROM specialties s
    LEFT JOIN doctor_profiles d ON d.specialty_id = s.id
    LEFT JOIN services sv ON sv.specialty_id = s.id
    GROUP BY s.id, s.name, s.description
    ORDER BY s.name
    """, nativeQuery = true)
    List<SpecialtySummaryProjection> getAllSpecialtySummary();
}
