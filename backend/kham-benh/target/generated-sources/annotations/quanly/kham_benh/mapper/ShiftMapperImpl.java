package quanly.kham_benh.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import quanly.kham_benh.Dto.request.ShiftCreationRequest;
import quanly.kham_benh.Dto.response.ShiftResponse;
import quanly.kham_benh.Entity.Shift;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-13T00:15:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.2 (Oracle Corporation)"
)
@Component
public class ShiftMapperImpl implements ShiftMapper {

    @Override
    public Shift toShift(ShiftCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Shift.ShiftBuilder shift = Shift.builder();

        shift.doctorId( request.getDoctorId() );
        shift.shiftDate( request.getShiftDate() );
        shift.startTime( request.getStartTime() );
        shift.endTime( request.getEndTime() );
        shift.maxPatients( request.getMaxPatients() );
        shift.note( request.getNote() );

        shift.slotMin( 15 );

        return shift.build();
    }

    @Override
    public ShiftResponse toResponse(Shift shift) {
        if ( shift == null ) {
            return null;
        }

        ShiftResponse.ShiftResponseBuilder shiftResponse = ShiftResponse.builder();

        shiftResponse.id( shift.getId() );
        shiftResponse.doctorId( shift.getDoctorId() );
        shiftResponse.shiftDate( shift.getShiftDate() );
        shiftResponse.startTime( shift.getStartTime() );
        shiftResponse.endTime( shift.getEndTime() );
        shiftResponse.bookable( shift.getBookable() );
        shiftResponse.maxPatients( shift.getMaxPatients() );
        shiftResponse.note( shift.getNote() );

        shiftResponse.slotMin( 15 );

        return shiftResponse.build();
    }

    @Override
    public List<ShiftResponse> toResponseList(List<Shift> shiftList) {
        if ( shiftList == null ) {
            return null;
        }

        List<ShiftResponse> list = new ArrayList<ShiftResponse>( shiftList.size() );
        for ( Shift shift : shiftList ) {
            list.add( toResponse( shift ) );
        }

        return list;
    }
}
