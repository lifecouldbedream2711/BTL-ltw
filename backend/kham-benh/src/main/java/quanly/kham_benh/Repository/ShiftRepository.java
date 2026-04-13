package quanly.kham_benh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quanly.kham_benh.Entity.Shift;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift,String> {
    List<Shift> findByShiftDate(LocalDate shiftDate);
    List<Shift> findByDoctorId(String id);
    Optional<Shift> findById(String id);
    List<Shift> findByDoctorIdAndShiftDate(String doctorId, LocalDate shiftDate);
    @Query(value = """
        ;WITH N AS (
            SELECT 0 AS n
            UNION ALL
            SELECT n + 1 FROM N WHERE n < 200
        )
        SELECT DISTINCT
            CONVERT(varchar(5),
                DATEADD(MINUTE, n.n * 15, CAST(ds.start_time AS datetime)), 108
            ) AS slot
        FROM dbo.doctor_shifts ds
        JOIN N
          ON DATEADD(MINUTE, n.n * 15, CAST(ds.start_time AS datetime)) < CAST(ds.end_time AS datetime)
        WHERE ds.doctor_id = :doctorId
          AND ds.shift_date = :shiftDate
          AND ds.is_bookable = 1
        ORDER BY slot
        OPTION (MAXRECURSION 400)
        """, nativeQuery = true)
    List<String> findShiftSlotsInDay(@Param("doctorId") String doctorId,
                                     @Param("shiftDate") LocalDate shiftDate);
}
