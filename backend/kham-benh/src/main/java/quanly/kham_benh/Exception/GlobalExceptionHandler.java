package quanly.kham_benh.Exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import quanly.kham_benh.Dto.response.APIResponse;

import javax.swing.text.html.parser.Entity;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<String> handlingRuntimeException(RuntimeException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<APIResponse> handlingAppException(AppException exception){
        ErrorCode errorCode=exception.getErrorCode();

        return ResponseEntity.badRequest().body(APIResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                .build());

    }

}
