package com.alten.basket;

import com.alten.basket.dto.BasketItemRequest;
import com.alten.basket.dto.BasketItemResponse;
import com.alten.basket.dto.BasketItemsRequest;
import com.alten.basket.mapper.BasketOutputMapper;
import com.alten.product.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.model.BasketItemsApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BasketService {
    private final BasketRepository repository;
    private final ProductService productService;
    private final BasketOutputMapper mapper;
    private final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public void delete(String id) {
        repository.deleteById(id);
    }

    public BasketItemsApiResponse listItems(String id) {
        Long now = now();
        BasketModel basket = getBasketOrElseInit(id, now);
        List<BasketItemResponse> items = getItems(basket.getItems());
        return mapper.basketItemsApiResponse(basket, items);
    }

    public BasketItemsApiResponse update(BasketItemsRequest request) {
        Long now = now();
        BasketModel basket = getBasketOrElseInit(request.id(), now);
        basket.setUpdatedAt(now);
        String newItems = getJsonItems(request.items());
        basket.setItems(newItems);

        BasketModel savedBasket = repository.save(basket);
        List<BasketItemResponse> savedItems = getItems(savedBasket.getItems());
        return mapper.basketItemsApiResponse(savedBasket, savedItems);
    }

    public void purchase(String id) {
        Optional<BasketModel> basketOpt = repository.findById(id);
        if(basketOpt.isEmpty()) {
            return;
        }
        basketOpt.ifPresent(basket -> {
            getItems(basket.getItems()).forEach(item -> {
                productService.purchaseProduct(item.productId(), item.quantity());
            });
            this.delete(basket.getId());
        });
    }

    private BasketModel getBasketOrElseInit(String id, Long now) {
        return repository.findById(id).orElseGet(() -> {
                BasketModel basketModel = BasketModel.builder()
                        .id(UUID.randomUUID().toString())
                        .items("[]")
                        .createdAt(now)
                        .updatedAt(now)
                        .build();
                return repository.save(basketModel);
                }
        );
    }

    private List<BasketItemResponse> getItems(String items) {
        try {
            return OBJECT_MAPPER.readValue(items, new TypeReference<List<BasketItemResponse>>(){});
        } catch (Exception e) {
            return List.of();
        }
    }

    private String getJsonItems(List<BasketItemRequest> items) {
        try {
            return OBJECT_MAPPER.writeValueAsString(items);
        } catch (Exception e) {
            return "[]";
        }
    }

    private Long now() {
        return System.currentTimeMillis();
    }
}
