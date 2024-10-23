package com.alten.error;

import com.alten.error.basket.BasketNotFoundException;
import com.alten.error.basket.BasketValidationException;
import com.alten.error.product.ProductNotFoundException;
import com.alten.error.product.ProductValidationException;
import com.alten.error.rest.RestError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

import static com.alten.error.rest.ErrorCodes.*;

@ControllerAdvice
@Slf4j
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(BAD_ARGUMENTS_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = "Bad Request Arguments !";

        List<String> errors = new ArrayList<String>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        RestError restError = new RestError(errorCode, errorMessage, errors);

        return handleExceptionInternal(ex, restError, headers, errorStatus, request);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(MISSING_REQUEST_PARAMETER_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        String errorMessage = "Bad Request Arguments !";

        String error = ex.getParameterName() + " parameter is missing";

        RestError restError = new RestError(errorCode, errorMessage, error);
        return new ResponseEntity<>(restError, headers, errorStatus);
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException ex) {
        doLog(ex);

        String errorCode = getErrorCode(METHOD_ARGUMENT_TYPE_MISMATCH_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = "Bad Request Arguments";

        String error =
                ex.getName()
                        + " should be of type "
                        + (ex.getRequiredType() != null ? ex.getRequiredType().getName() : "");

        RestError restError = new RestError(errorCode, errorMessage, error);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(METHOD_NOT_SUPPORTED_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.METHOD_NOT_ALLOWED;

        String errorMessage = "Method Not Supported";

        StringBuilder builder = new StringBuilder();
        builder.append(ex.getMethod());
        builder.append(" method is not supported for this request. Supported methods are ");
        ex.getSupportedHttpMethods().forEach(t -> builder.append(t + " "));

        RestError restError = new RestError(errorCode, errorMessage, builder.toString());
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(MEDIA_TYPE_NOT_SUPPORTED_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.UNSUPPORTED_MEDIA_TYPE;

        String errorMessage = "Media Type Not Supported";

        StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t + ", "));

        RestError restError =
                new RestError(errorCode, errorMessage, builder.substring(0, builder.length() - 2));
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({ProductValidationException.class})
    public ResponseEntity<Object> handleProductValidationException(ProductValidationException ex) {
        doLog(ex);

        String errorCode = getErrorCode(PRODUCT_VALIDATION_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({ProductNotFoundException.class})
    public ResponseEntity<Object> handleProductValidationException(ProductNotFoundException ex) {
        doLog(ex);

        String errorCode = getErrorCode(PRODUCT_NOT_FOUND_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.NOT_FOUND;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({BasketValidationException.class})
    public ResponseEntity<Object> handleBasketValidationException(BasketValidationException ex) {
        doLog(ex);

        String errorCode = getErrorCode(BASKET_VALIDATION_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({BasketNotFoundException.class})
    public ResponseEntity<Object> handleBasketNotFoundException(BasketNotFoundException ex) {
        doLog(ex);

        String errorCode = getErrorCode(BASKET_NOT_FOUND_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.NOT_FOUND;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleInternalExceptions(Exception ex, WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(SERVER_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        String errorMessage = ex.getLocalizedMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);

        return handleExceptionInternal(ex, restError, new HttpHeaders(), errorStatus, request);
    }

    private void doLog(Throwable ex) {
        log.error(ex.getLocalizedMessage(), ex);
    }

    public static String getErrorCode(String errorCode) {
        return ERROR_CODE_PREFIX + errorCode;
    }
}
