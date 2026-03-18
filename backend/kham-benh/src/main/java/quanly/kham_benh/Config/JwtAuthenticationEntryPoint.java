package quanly.kham_benh.Config;



import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.web.AuthenticationEntryPoint;
import quanly.kham_benh.Dto.response.APIResponse;
import quanly.kham_benh.Exception.ErrorCode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException authException) throws IOException, ServletException {

            ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;

            response.setStatus(errorCode.getStatusCode().value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            APIResponse<?> apiResponse = APIResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

            ObjectMapper objectMapper = new ObjectMapper();

            response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
            response.flushBuffer();
    }
}
