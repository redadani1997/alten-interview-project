package com.alten.basket;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "basket")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketModel {
    @Id
    private String id;

    private String items;
    private Long createdAt;
    private Long updatedAt;
}
