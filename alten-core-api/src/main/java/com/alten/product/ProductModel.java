package com.alten.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;
    private String image;
    private String category;
    private Double price;
    private Long quantity;
    private String internalReference;
    private String shelfId;
    @Enumerated(EnumType.STRING)
    private InventoryStatus inventoryStatus;
    private Long rating;
    private Long createdAt;
    private Long updatedAt;


    public enum InventoryStatus {
        INSTOCK, LOWSTOCK, OUTOFSTOCK
    }
}
