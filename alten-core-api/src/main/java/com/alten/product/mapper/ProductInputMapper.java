package com.alten.product.mapper;

import com.alten.error.product.ProductValidationException;
import com.alten.product.dto.ProductCreateRequest;
import com.alten.product.dto.ProductPatchRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@Service
public class ProductInputMapper {

    public ProductCreateRequest productCreateRequest(String code, String name, MultipartFile image,
                                                     String category, String price, String quantity,
                                                     String internalReference, String shelfId,
                                                     String rating) {
        assertNotBlank("Code", code);
        assertNotBlank("Name", name);
        assertNotNegative("Price", doCastToDouble("Price", price));
        assertNotNegative("Quantity", Long.valueOf(quantity));
        assertNotBlank("Category", category);
        assertNotBlank("Internal Reference", internalReference);
        assertNotBlank("Shell Id", shelfId);
        assertNotNegative("Rating", Long.valueOf(rating));

        String base64Image = imageToBase64(image);

        return new ProductCreateRequest(
            code,
            name,
            base64Image,
            category,
            doCastToDouble("Price", price),
            doCastToLong("Quantity", quantity),
            internalReference,
            shelfId,
            doCastToLong("Rating", rating)
        );
    }

    public ProductPatchRequest productPatchRequest(Long id, String code, String name,
                                                   MultipartFile image, String category,
                                                   String price, String quantity,
                                                   String internalReference, String shelfId,
                                                   String rating) {
        assertNotNull("Id", id);

        String base64Image = imageToBase64(image);

        return new ProductPatchRequest(
                id,
                code,
                name,
                base64Image,
                category,
                doCastToDouble("Price", price),
                doCastToLong("Quantity", quantity),
                internalReference,
                shelfId,
                doCastToLong("Rating", rating)
        );
    }

    private String imageToBase64(MultipartFile image) {
        if(image == null) {
            return null;
        }
        try {
            byte[] bytes = Base64.getEncoder().encode(image.getBytes());
            return new String(bytes);
        } catch (Exception e) {
            throw new ProductValidationException("Image is invalid");
        }
    }

    private void assertNotBlank(String attribute, String value) {
        assertNotNull(attribute, value);
        if (value.isBlank()) {
            throw new ProductValidationException(attribute + " is required");
        }
    }

    private void assertNotNegative(String attribute, Number value) {
        assertNotNull(attribute, value);
        if (value.doubleValue() < 0) {
            throw new ProductValidationException(attribute + " should be >= 0");
        }
    }

    private void assertNotNull(String attribute, Object value) {
        if (value == null) {
            throw new ProductValidationException(attribute + " is required");
        }
    }

    private Long doCastToLong(String attribute, String value) {
        if (value == null) {
            return null;
        }
        try {
            return Long.valueOf(value);
        } catch (NumberFormatException e) {
            throw new ProductValidationException("Invalid value for " + attribute);
        }
    }

    private Double doCastToDouble(String attribute, String value) {
        if (value == null) {
            return null;
        }
        try {
            return Double.valueOf(value);
        } catch (NumberFormatException e) {
            throw new ProductValidationException("Invalid value for " + attribute);
        }
    }
}
