package quanly.kham_benh.Controller;


import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quanly.kham_benh.Dto.request.IntrospectRequest;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Dto.request.AuthenticationRequest;
import quanly.kham_benh.Dto.response.AuthenticationResponse;
import quanly.kham_benh.Dto.response.IntrospectResponse;
import quanly.kham_benh.Service.AuthenticationService;

import java.text.ParseException;


@RestController
@RequestMapping("/Authenticate")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("token")
    APIResponse<AuthenticationResponse> Authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.Authenticate(request);
        return APIResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();

    }
    @PostMapping("introspect")
    APIResponse<IntrospectResponse> Introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.Introspect(request);
        return APIResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }


}
