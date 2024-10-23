package com.alten.error.product;

public class ProductNotFoundException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public ProductNotFoundException(Long id) {
        this.message = String.format("Product with Id %s not found", id);
    }

    public ProductNotFoundException(Throwable cause) {
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
