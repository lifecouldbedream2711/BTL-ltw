package quanly.kham_benh.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.ServiceCreationRequest;
import quanly.kham_benh.Dto.response.ServiceResponse;
import quanly.kham_benh.Entity.MedicalService;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class ServiceMapperImpl implements ServiceMapper {

    @Override
    public MedicalService toService(ServiceCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        MedicalService.MedicalServiceBuilder medicalService = MedicalService.builder();

        medicalService.specialtyId( request.getSpecialtyId() );
        medicalService.name( request.getName() );
        medicalService.description( request.getDescription() );
        medicalService.price( request.getPrice() );
        medicalService.durationMin( request.getDurationMin() );
        medicalService.active( request.isActive() );

        return medicalService.build();
    }

    @Override
    public ServiceResponse toResponse(MedicalService medicalService) {
        if ( medicalService == null ) {
            return null;
        }

        ServiceResponse.ServiceResponseBuilder serviceResponse = ServiceResponse.builder();

        serviceResponse.id( medicalService.getId() );
        serviceResponse.specialtyId( medicalService.getSpecialtyId() );
        serviceResponse.name( medicalService.getName() );
        serviceResponse.description( medicalService.getDescription() );
        serviceResponse.price( medicalService.getPrice() );
        if ( medicalService.getDurationMin() != null ) {
            serviceResponse.durationMin( medicalService.getDurationMin() );
        }
        if ( medicalService.getActive() != null ) {
            serviceResponse.active( medicalService.getActive() );
        }

        return serviceResponse.build();
    }

    @Override
    public List<ServiceResponse> toResponseList(List<MedicalService> medicalServiceList) {
        if ( medicalServiceList == null ) {
            return null;
        }

        List<ServiceResponse> list = new ArrayList<ServiceResponse>( medicalServiceList.size() );
        for ( MedicalService medicalService : medicalServiceList ) {
            list.add( toResponse( medicalService ) );
        }

        return list;
    }
}
