package com.alten.error.basket;

public class BasketNotFoundException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public BasketNotFoundException(String id) {
        this.message = String.format("Basket with Id %s not found", id);
    }

    public BasketNotFoundException(Throwable cause) {
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
