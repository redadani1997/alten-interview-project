package com.alten.product.dto;

public record ProductCreateRequest(String code, String name, String description, String image,
                                   String category, Double price, Long quantity,
                                   String internalReference, String shelfId,
                                   Long rating) {
}
