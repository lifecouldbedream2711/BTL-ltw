package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.Specialty;

@Mapper(componentModel = "spring")
public interface SpecialtyMapper {
    Specialty toSpecialty(SpecialtyCreationRequest request);
    SpecialtyResponse toResponse(Specialty service);
}

