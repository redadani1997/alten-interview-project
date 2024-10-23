package com.alten.error.rest;

import lombok.Data;

import java.util.Arrays;
import java.util.List;

@Data
public class RestError {
    private String errorCode;
    private String message;
    private List<String> errors;

    public RestError(String errorCode, String message, List<String> errors) {
        super();
        this.errorCode = errorCode;
        this.message = message;
        this.errors = errors;
    }

    public RestError(String errorCode, String message, String error) {
        super();
        this.errorCode = errorCode;
        this.message = message;
        errors = Arrays.asList(error);
    }
}
