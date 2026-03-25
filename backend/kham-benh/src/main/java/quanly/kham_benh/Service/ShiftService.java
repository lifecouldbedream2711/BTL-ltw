package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Entity.Shift;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.DoctorRepository;
import quanly.kham_benh.Repository.ShiftRepository;
import quanly.kham_benh.mapper.ShiftMapper;

import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ShiftService {
    ShiftMapper shiftMapper;
    DoctorRepository doctorRepository;
    ShiftRepository shiftRepository;
    public ShiftResponse createShift(ShiftCreationRequest request) {

        List<Shift> shiftList=shiftRepository.findByShiftDate(request.getShiftDate());
        shiftList.forEach(item->{
            if(isBetween(request.getStartTime(),item.getStartTime(),item.getEndTime())||
                    isBetween(request.getEndTime(),item.getStartTime(),item.getEndTime()))
                throw new AppException(ErrorCode.TIME_REGISTED);
        });
        if(!doctorRepository.existsById(request.getDoctorId()))
            throw new AppException(ErrorCode.DOCTOR_NOT_FOUND);

        Shift shift=shiftMapper.toShift(request);
        shiftRepository.save(shift);
        return shiftMapper.toResponse(shift);
    }
    public List<ShiftResponse> GetAllShift(){
        List<Shift> shiftList= shiftRepository.findAll();
        List<ShiftResponse> result=shiftMapper.toResponseList(shiftList);

        return result;
    }
    public List<ShiftResponse> GetDoctorShift(String id){
        List<Shift> shiftList= shiftRepository.findByDoctorId(id);
        List<ShiftResponse> result=shiftMapper.toResponseList(shiftList);

        return result;
    }
    public boolean isBetween(LocalTime target, LocalTime start, LocalTime end) {
        return !target.isBefore(start) && !target.isAfter(end);
    }
}

