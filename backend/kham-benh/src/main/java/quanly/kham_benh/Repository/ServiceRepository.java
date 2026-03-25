package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.MedicalService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<MedicalService,String> {
    boolean existsByName(String name);
    Optional<MedicalService> findByName(String name);
//    List<MedicalService> findBySpecialtyId(String specialtyId);
//    List<MedicalService> findByPrice(BigDecimal price);            // bằng đúng giá
//    List<MedicalService> findByPriceLessThanEqual(BigDecimal price); // <= giá
//    List<MedicalService> findByPriceGreaterThanEqual(BigDecimal price);
//    List<MedicalService> findByDurationMin(int durationMin);           // bằng đúng duration
//    List<MedicalService> findByDurationMinLessThanEqual(int duration); // <= duration
//    List<MedicalService> findByDurationMinGreaterThanEqual(int duration); // >= duration// >= giá
    List<MedicalService> findByNameContainingIgnoreCase(String keyword);
}
