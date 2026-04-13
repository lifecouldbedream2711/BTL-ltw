package quanly.kham_benh.Interface;

// DoctorInfoProjection.java
public interface DoctorInfoProjection {
    String getId();
    String getFullName();
    String getEmail();
    String getPhone();
    String getRole();
    Boolean getIsActive();
    java.time.LocalDateTime getCreatedAt();

    String getSpecialtyId();
    String getSpecialtyName();
    String getLicenseNo();
    String getBio();
}