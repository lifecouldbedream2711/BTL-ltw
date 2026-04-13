package quanly.kham_benh.Interface;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface PatientInfoProjection {
    String getId();
    String getFullName();
    String getEmail();
    String getPhone();
    String getRole();
    Boolean getIsActive();
    LocalDateTime getCreatedAt();
    LocalDate getDob();
    String getGender();
    String getAddress();
    String getAllergies();
    String getMedicalHistory();
}