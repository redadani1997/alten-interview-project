package com.alten.basket;

import com.alten.basket.dto.BasketItemsRequest;
import com.alten.basket.mapper.BasketInputMapper;
import io.swagger.api.BasketApi;
import io.swagger.model.BasketItemsApiResponse;
import io.swagger.model.BasketUpdateItemsApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BasketController implements BasketApi {
    private final BasketService service;
    private final BasketInputMapper mapper;

    @Override
    public ResponseEntity<Void> deleteBasketItems(String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<BasketItemsApiResponse> listBasketItems(String id) {
        BasketItemsApiResponse response = service.listItems(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public ResponseEntity<Void> purchaseBasketItems(String id) {
        service.purchase(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<BasketItemsApiResponse> updateBasketItems(String id, BasketUpdateItemsApiRequest apiRequest) {
        BasketItemsRequest request = mapper.basketItemsRequest(id, apiRequest);
        BasketItemsApiResponse response = service.update(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
