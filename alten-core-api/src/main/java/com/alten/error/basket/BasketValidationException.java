package com.alten.error.basket;

public class BasketValidationException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public BasketValidationException(String message) {
        this.message = message;
    }

    public BasketValidationException(Throwable cause) {
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
