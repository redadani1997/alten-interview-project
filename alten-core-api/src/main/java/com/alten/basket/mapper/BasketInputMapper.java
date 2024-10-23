package com.alten.basket.mapper;

import com.alten.basket.dto.BasketItemRequest;
import com.alten.basket.dto.BasketItemsRequest;
import com.alten.error.basket.BasketValidationException;
import io.swagger.model.BasketItemApiRequest;
import io.swagger.model.BasketUpdateItemsApiRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasketInputMapper {
    public BasketItemsRequest basketItemsRequest(String id, BasketUpdateItemsApiRequest apiRequest) {
        assertNotNull("Id", id);
        assertNotNull("Request", apiRequest);
        assertNotNull("Items", apiRequest.getItems());

        List<BasketItemRequest> items = apiRequest.getItems().stream().map(this::basketItemRequest).toList();
        return new BasketItemsRequest(id, items);
    }

    public BasketItemRequest basketItemRequest(BasketItemApiRequest apiRequest) {
        assertNotNull("Request", apiRequest);
        assertNotNull("Product Id", apiRequest.getProductId());
        assertNotNull("Quantity", apiRequest.getQuantity());

        return new BasketItemRequest(
            apiRequest.getProductId(),
            apiRequest.getQuantity()
        );
    }

    private void assertNotNull(String attribute, Object value) {
        if (value == null) {
            throw new BasketValidationException(attribute + " is required");
        }
    }
}
