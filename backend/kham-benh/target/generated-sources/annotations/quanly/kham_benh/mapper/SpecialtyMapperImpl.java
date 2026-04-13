package quanly.kham_benh.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.SpecialtyCreationRequest;
import quanly.kham_benh.Dto.response.SpecialtyResponse;
import quanly.kham_benh.Entity.Specialty;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class SpecialtyMapperImpl implements SpecialtyMapper {

    @Override
    public Specialty toSpecialty(SpecialtyCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Specialty.SpecialtyBuilder specialty = Specialty.builder();

        specialty.name( request.getName() );
        specialty.description( request.getDescription() );

        return specialty.build();
    }

    @Override
    public SpecialtyResponse toResponse(Specialty service) {
        if ( service == null ) {
            return null;
        }

        SpecialtyResponse.SpecialtyResponseBuilder specialtyResponse = SpecialtyResponse.builder();

        specialtyResponse.id( service.getId() );
        specialtyResponse.name( service.getName() );
        specialtyResponse.description( service.getDescription() );

        return specialtyResponse.build();
    }
}
