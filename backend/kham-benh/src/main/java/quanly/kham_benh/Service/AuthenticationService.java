package quanly.kham_benh.Service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quanly.kham_benh.Dto.request.AuthenticationRequest;
import quanly.kham_benh.Dto.request.IntrospectRequest;
import quanly.kham_benh.Dto.response.AuthenticationResponse;
import quanly.kham_benh.Dto.response.IntrospectResponse;
import quanly.kham_benh.Exception.AppException;
import quanly.kham_benh.Exception.ErrorCode;
import quanly.kham_benh.Repository.UserRepository;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class AuthenticationService {
    @Autowired
    UserRepository userRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public IntrospectResponse Introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token=request.getToken();

        JWSVerifier verifier= new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT=SignedJWT.parse(token);

        Date expityTime =signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified=signedJWT.verify(verifier);
        return IntrospectResponse.builder()
                .valid(verified && expityTime.after(new Date()))
                .build();
    }

    public AuthenticationResponse Authenticate(AuthenticationRequest request){
        var user =userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new RuntimeException("user not exited"));

        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
        boolean result= passwordEncoder.matches(request.getPassword(), user.getPassword_hash());

        if(!result){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        var token= generateToken(request.getEmail());

        return AuthenticationResponse.builder()
                .authenticated(true)
                .token(token)
                .build();

    }
        private String generateToken(String email){
            JWSHeader header =new JWSHeader(JWSAlgorithm.HS512    );

            JWTClaimsSet jwtClaimsSet= new  JWTClaimsSet.Builder()
                    .subject(email)
                    .issuer("hello niggas")
                    .issueTime(new Date())
                    .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                    ))
                    .claim("customClaim","Custom")
                    .build();

            Payload payload=new Payload(jwtClaimsSet.toJSONObject());


            JWSObject jwsObject =new JWSObject(header,payload);

            try{
                jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
                return jwsObject.serialize();
            } catch (JOSEException exception){
                log.error("cant create JWT key ",exception);
                throw new RuntimeException(exception);
            }
        }

}
