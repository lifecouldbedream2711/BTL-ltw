package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.Shift;
import quanly.kham_benh.Entity.Specialty;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShiftMapper {
    @Mapping(target = "slotMin", constant = "15") // update vẫn giữ 15
    Shift toShift(ShiftCreationRequest request);

    @Mapping(target = "slotMin", constant = "15") // update vẫn giữ 15
    ShiftResponse toResponse(Shift shift);

    @Mapping(target = "slotMin", constant = "15") // update vẫn giữ 15
    List<ShiftResponse> toResponseList(List<Shift> shiftList);
}

