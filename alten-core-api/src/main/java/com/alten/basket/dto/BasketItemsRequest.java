package com.alten.basket.dto;

import java.util.List;

public record BasketItemsRequest(String id, List<BasketItemRequest> items) {
}
