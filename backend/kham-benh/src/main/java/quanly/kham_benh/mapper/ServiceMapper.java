package quanly.kham_benh.mapper;

import org.mapstruct.Mapper;
import quanly.kham_benh.Dto.request.ServiceCreationRequest;
import quanly.kham_benh.Dto.response.ServiceResponse;
import quanly.kham_benh.Entity.MedicalService;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    MedicalService toService(ServiceCreationRequest request);
    ServiceResponse toResponse(MedicalService medicalService);
    List<ServiceResponse> toResponseList(List<MedicalService> medicalServiceList);
}

