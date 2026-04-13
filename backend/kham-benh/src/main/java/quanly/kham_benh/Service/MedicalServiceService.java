package quanly.kham_benh.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.MedicalServiceSearchRequest;
import quanly.kham_benh.Dto.request.ServiceCreationRequest;
import quanly.kham_benh.Dto.response.ServiceResponse;
import quanly.kham_benh.Entity.MedicalService;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.MedicalServiceRepository;
import quanly.kham_benh.mapper.ServiceMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class MedicalServiceService {
    MedicalServiceRepository medicalServiceRepository;
    ServiceMapper serviceMapper;
    public ServiceResponse CreateService(ServiceCreationRequest request){
        if (medicalServiceRepository.existsByName(request.getName()))
            throw new AppException(ErrorCode.SERVICE_EXISTSED);

        MedicalService medicalService = serviceMapper.toService(request);
        medicalService.setActive(request.isActive());
        medicalService.setSpecialtyId(request.getSpecialtyId());
        medicalService.setDurationMin(request.getDurationMin());
        ServiceResponse response=serviceMapper.toResponse(medicalServiceRepository.save(medicalService));
        response.setActive(medicalService.getActive());
        response.setDurationMin(medicalService.getDurationMin());
        response.setSpecialtyId(medicalService.getSpecialtyId());
        return response;
    }

    public List<ServiceResponse> FindService(String key){
        List<MedicalService> medicalServiceList = medicalServiceRepository.findByNameContainingIgnoreCase(key);
        List<ServiceResponse> serviceResponseList=new ArrayList<>();

        medicalServiceList.forEach(item ->
                serviceResponseList.add(serviceMapper.toResponse(item)));

        return serviceResponseList;
    }
    public List<ServiceResponse> GetAllService(){
        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        List<ServiceResponse> serviceResponseList=new ArrayList<>();

        medicalServiceList.forEach(item ->
        serviceResponseList.add(mapResponse(item)));

        return serviceResponseList;
    }
    public ServiceResponse mapResponse(MedicalService service){
        ServiceResponse response=serviceMapper.toResponse(service);
        response.setSpecialtyId(service.getSpecialtyId());
        response.setDurationMin(service.getDurationMin());
        return response;
    }
    public ServiceResponse UpdateService(ServiceCreationRequest request,String id){
        MedicalService medicalService = medicalServiceRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.SERVICE_NOT_EXISTSED));
        medicalService.setName(request.getName());
        medicalService.setDescription(request.getDescription());
        medicalService.setPrice(request.getPrice());
        medicalService.setSpecialtyId(request.getSpecialtyId());
        medicalService.setDurationMin(request.getDurationMin());
        medicalService.setActive(request.isActive());
        ServiceResponse response=serviceMapper.toResponse(medicalServiceRepository.save(medicalService));
        response.setActive(medicalService.getActive());
        return response;
    }
    public String DeleteService(String id){
        MedicalService medicalService= medicalServiceRepository.findById(id).orElseThrow(
                ()-> new AppException(ErrorCode.SERVICE_NOT_EXISTSED)
        );
        medicalServiceRepository.delete(medicalService);
        return "Delete Success";
    }
    public List<MedicalService> search(MedicalServiceSearchRequest request) {
        return medicalServiceRepository.search(
                request.getSpecialtyId(),
                request.getActive(),
                request.getMinPrice(),
                request.getMaxPrice(),
                request.getMinDuration(),
                request.getMaxDuration(),
                request.getKeyword()
        );
    }
}
