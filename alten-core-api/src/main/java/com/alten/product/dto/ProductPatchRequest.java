package com.alten.product.dto;

public record ProductPatchRequest(Long id, String code, String name, String image,
                                  String category, Double price, Long quantity,
                                  String internalReference, String shelfId,
                                  Long rating) {
}
