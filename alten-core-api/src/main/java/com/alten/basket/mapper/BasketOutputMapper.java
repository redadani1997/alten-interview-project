package com.alten.basket.mapper;

import com.alten.basket.BasketModel;
import com.alten.basket.dto.BasketItemResponse;
import io.swagger.model.BasketItemApiResponse;
import io.swagger.model.BasketItemsApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasketOutputMapper {

    public BasketItemsApiResponse basketItemsApiResponse(BasketModel basket, List<BasketItemResponse> items) {
        BasketItemsApiResponse response = new BasketItemsApiResponse();
        response.setId(basket.getId());
        response.setCreatedAt(basket.getCreatedAt());
        response.setUpdatedAt(basket.getUpdatedAt());
        response.setItems(items.stream().map(this::basketItemApiResponse).toList());
        return response;
    }

    private BasketItemApiResponse basketItemApiResponse(BasketItemResponse item) {
        BasketItemApiResponse response = new BasketItemApiResponse();
        response.setProductId(item.productId());
        response.setQuantity(item.quantity());
        return response;
    }
}
