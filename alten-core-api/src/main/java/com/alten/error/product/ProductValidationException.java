package com.alten.error.product;

public class ProductValidationException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public ProductValidationException(String message) {
        this.message = message;
    }

    public ProductValidationException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public Throwable getCause() {
        return this.cause != null ? this.cause : super.getCause();
    }
}
