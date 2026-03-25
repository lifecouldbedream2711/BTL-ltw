package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.ServiceCreationRequest;
import quanly.kham_benh.Dto.response.ServiceResponse;
import quanly.kham_benh.Entity.MedicalService;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.ServiceRepository;
import quanly.kham_benh.mapper.ServiceMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class MedicalServiceService {
    ServiceRepository serviceRepository;
    ServiceMapper serviceMapper;
    public ServiceResponse CreateService(ServiceCreationRequest request){
        if (serviceRepository.existsByName(request.getName()))
            throw new AppException(ErrorCode.SERVICE_EXISTSED);

        MedicalService medicalService = serviceMapper.toService(request);
        medicalService.setActive(request.isActive());
        ServiceResponse response=serviceMapper.toResponse(serviceRepository.save(medicalService));
        response.setActive(medicalService.isActive());
        return response;
    }

    public List<ServiceResponse> FindService(String key){
        List<MedicalService> medicalServiceList =serviceRepository.findByNameContainingIgnoreCase(key);
        List<ServiceResponse> serviceResponseList=new ArrayList<>();

        medicalServiceList.forEach(item ->
                serviceResponseList.add(serviceMapper.toResponse(item)));

        return serviceResponseList;
    }
    public List<ServiceResponse> GetAllService(){
        List<MedicalService> medicalServiceList =serviceRepository.findAll();
        List<ServiceResponse> serviceResponseList=new ArrayList<>();

        medicalServiceList.forEach(item ->
        serviceResponseList.add(serviceMapper.toResponse(item)));

        return serviceResponseList;
    }

    public ServiceResponse UpdateService(ServiceCreationRequest request,String id){
        MedicalService medicalService =serviceRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.SERVICE_NOT_EXISTSED));
        medicalService.setName(request.getName());
        medicalService.setDescription(request.getDescription());
        medicalService.setPrice(request.getPrice());
        medicalService.setSpecialty_id(request.getSpecialty_id());
        medicalService.setDuration_min(request.getDuration_min());
        medicalService.setActive(request.isActive());
        ServiceResponse response=serviceMapper.toResponse(serviceRepository.save(medicalService));
        response.setActive(medicalService.isActive());
        return response;
    }
    public String DeleteService(String id){
        MedicalService medicalService=serviceRepository.findById(id).orElseThrow(
                ()-> new AppException(ErrorCode.SERVICE_NOT_EXISTSED)
        );
        serviceRepository.delete(medicalService);
        return "Delete Success";
    }
}
