package com.alten.product;

import com.alten.error.product.ProductNotFoundException;
import com.alten.error.product.ProductValidationException;
import com.alten.product.dto.ProductCreateRequest;
import com.alten.product.dto.ProductPatchRequest;
import com.alten.product.mapper.ProductOutputMapper;
import io.swagger.model.ProductApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;
    private final ProductOutputMapper mapper;

    public ProductApiResponse create(ProductCreateRequest request) {
        Long now = now();
        ProductModel product = ProductModel
                .builder()
                .code(request.code())
                .name(request.name())
                .description(request.description())
                .image(request.image())
                .category(request.category())
                .price(request.price())
                .quantity(request.quantity())
                .internalReference(request.internalReference())
                .shelfId(request.shelfId())
                .inventoryStatus(computeInventoryStatus(request.quantity()))
                .rating(request.rating())
                .createdAt(now)
                .updatedAt(now)
                .build();
        ProductModel savedProduct = repository.save(product);
        return mapper.productApiResponse(savedProduct);
    }

    public ProductApiResponse patch(ProductPatchRequest request) {
        ProductModel product = getByIdOrThrow(request.id());
        product.setUpdatedAt(now());
        if(request.code() != null && !request.code().isBlank()) {
            product.setCode(request.code());
        }
        if(request.name() != null && !request.name().isBlank()) {
            product.setName(request.name());
        }
        if(request.description() != null && !request.description().isBlank()) {
            product.setDescription(request.description());
        }
        if(request.image() != null && !request.image().isBlank()) {
            product.setImage(request.image());
        }
        if(request.category() != null && !request.category().isBlank()) {
            product.setCategory(request.category());
        }
        if(request.price() != null && request.price() >= 0) {
            product.setPrice(request.price());
        }
        if (request.quantity() != null) {
            product.setQuantity(request.quantity());
            product.setInventoryStatus(computeInventoryStatus(request.quantity()));
        }
        if(request.internalReference() != null && !request.internalReference().isBlank()) {
            product.setInternalReference(request.internalReference());
        }
        if(request.shelfId() != null && !request.shelfId().isBlank()) {
            product.setShelfId(request.shelfId());
        }
        if(request.rating() != null) {
            product.setRating(request.rating());
        }
        ProductModel savedProduct = repository.save(product);
        return mapper.productApiResponse(savedProduct);
    }

    public void purchaseProduct(Long productId, Long quantity) {
        ProductModel product = getByIdOrThrow(productId);
        if (product.getQuantity() < quantity) {
            throw new ProductValidationException("Not enough stock for product: " + product.getName());
        }
        product.setQuantity(product.getQuantity() - quantity);
        product.setInventoryStatus(computeInventoryStatus(product.getQuantity()));
        repository.save(product);
    }

    public List<ProductApiResponse> list() {
        return repository.findAll().stream()
                .map(mapper::productApiResponse)
                .toList();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ProductApiResponse get(Long id) {
        ProductModel product = getByIdOrThrow(id);
        return mapper.productApiResponse(product);
    }

    private ProductModel getByIdOrThrow(Long id) {
        Optional<ProductModel> product = repository.findById(id);
        return product.orElseThrow(() -> new ProductNotFoundException(id));
    }

    private ProductModel.InventoryStatus computeInventoryStatus(Long quantity) {
        if (quantity > 10) {
            return ProductModel.InventoryStatus.INSTOCK;
        } else if (quantity > 0) {
            return ProductModel.InventoryStatus.LOWSTOCK;
        } else {
            return ProductModel.InventoryStatus.OUTOFSTOCK;
        }
    }

    private Long now() {
        return System.currentTimeMillis();
    }
}
