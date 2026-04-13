package quanly.kham_benh.Exception;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    SPECIALTY_NOT_FOUND(1001,"khoa này không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_NOT_FOUND(1001,"Người dùng này không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    SERVICE_NOT_EXISTSED(1003,"Dịch vụ này không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    TIME_REGISTED(1003,"ca làm bị trùng giờ với ca làm khác", HttpStatus.INTERNAL_SERVER_ERROR),
    DOCTOR_NOT_FOUND(1001,"Bác sỹ không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    PATIENT_NOT_FOUND(1001,"Bệnh nhân không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    SHIFT_NOT_FOUND(1001,"Ca làm không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    APPOINTMENT_TIME_REGISTED(1003,"khung giờ bị trùng với ca khác đã được duyệt", HttpStatus.INTERNAL_SERVER_ERROR),
    APPOINTMENT_NOT_FOUND(1001,"Đơn khám không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    RECORD_NOT_FOUND(1001,"Lịch sử không tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),

    SPECIALTY_EXISTSED(1002,"đã tồn tại khoa này", HttpStatus.INTERNAL_SERVER_ERROR),
    SERVICE_EXISTSED(1003,"Dịch vụ này đã tồn tại", HttpStatus.INTERNAL_SERVER_ERROR),
    EMAIL_EXISTSED(1004,"email đã được đăng ký bởi người dùng khác", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    ;



    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

}
