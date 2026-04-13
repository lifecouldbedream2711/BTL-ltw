package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.MedicalService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalService, String> {

    boolean existsByName(String name);
    Optional<MedicalService> findByName(String name);

    @Query(value = """
    SELECT s.*
    FROM services s
    WHERE (:specialtyId IS NULL OR s.specialty_id = :specialtyId)
      AND (:active IS NULL OR s.is_active = :active)
      AND (:minPrice IS NULL OR s.price >= :minPrice)
      AND (:maxPrice IS NULL OR s.price <= :maxPrice)
      AND (:minDuration IS NULL OR s.duration_min >= :minDuration)
      AND (:maxDuration IS NULL OR s.duration_min <= :maxDuration)
      AND (
        :keyword IS NULL OR
        s.name COLLATE Latin1_General_100_CI_AI LIKE '%' + :keyword + '%'
      )
    """, nativeQuery = true)
    List<MedicalService> search(
            @Param("specialtyId") String specialtyId,
            @Param("active") Boolean active,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minDuration") Integer minDuration,
            @Param("maxDuration") Integer maxDuration,
            @Param("keyword") String keyword
    );

    List<MedicalService> findByNameContainingIgnoreCase(String keyword);
}