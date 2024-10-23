package com.alten.product;

import com.alten.product.dto.ProductCreateRequest;
import com.alten.product.dto.ProductPatchRequest;
import com.alten.product.mapper.ProductInputMapper;
import io.swagger.api.ProductApi;
import io.swagger.model.ProductApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController implements ProductApi {
    private final ProductService service;
    private final ProductInputMapper mapper;

    @Override
    public ResponseEntity<ProductApiResponse> createProduct(String code, String name, MultipartFile image, String category, String price, String quantity, String internalReference, String shelfId, String rating) {
        ProductCreateRequest request = mapper.productCreateRequest(code, name, image, category, price, quantity, internalReference, shelfId, rating);
        ProductApiResponse response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    public ResponseEntity<List<ProductApiResponse>> listProducts() {
        List<ProductApiResponse> responses = service.list();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @Override
    public ResponseEntity<Void> deleteProduct(Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<ProductApiResponse> getProduct(Long id) {
        ProductApiResponse response = service.get(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public ResponseEntity<ProductApiResponse> patchProduct(Long id, String code, String name, MultipartFile image, String category, String price, String quantity, String internalReference, String shelfId, String rating) {
        ProductPatchRequest request = mapper.productPatchRequest(id, code, name, image, category, price, quantity, internalReference, shelfId, rating);
        ProductApiResponse response = service.patch(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
