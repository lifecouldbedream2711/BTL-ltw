package quanly.kham_benh.Dto.request;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentSearchRequest {

    private String patientName;   // tên bệnh nhân
    private String doctorName;    // tên bác sĩ
    private LocalDate fromDate;   // từ ngày
    private LocalDate toDate;     // đến ngày
    private LocalTime fromTime;   // từ giờ
    private LocalTime toTime;     // đến giờ
    private String serviceId;     // id dịch vụ
    private String status;        // trạng thái
}