package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.Shift;
import quanly.kham_benh.Entity.Specialty;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShiftMapper {
    Shift toShift(ShiftCreationRequest request);
    ShiftResponse toResponse(Shift shift);
    List<ShiftResponse> toResponseList(List<Shift> shiftList);
}

