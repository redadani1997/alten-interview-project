package com.alten.product.mapper;

import com.alten.product.ProductModel;
import io.swagger.model.ProductApiResponse;
import org.springframework.stereotype.Service;

@Service
public class ProductOutputMapper {
    public ProductApiResponse productApiResponse(ProductModel productModel) {
        ProductApiResponse response = new ProductApiResponse();
        response.setId(productModel.getId());
        response.setCode(productModel.getCode());
        response.setName(productModel.getName());
        response.setImage(productModel.getImage());
        response.setCategory(productModel.getCategory());
        response.setPrice(productModel.getPrice());
        response.setQuantity(productModel.getQuantity());
        response.setInternalReference(productModel.getInternalReference());
        response.setShelfId(productModel.getShelfId());
        response.setInventoryStatus(productModel.getInventoryStatus().name());
        response.setRating(productModel.getRating());
        response.setCreatedAt(productModel.getCreatedAt());
        response.setUpdatedAt(productModel.getUpdatedAt());
        return response;
    }
}
