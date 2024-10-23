package com.alten.error.rest;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ErrorCodes {
    public static final String ERROR_CODE_PREFIX = "altenproject-";

    public static final String SERVER_ERROR_CODE = "0000";

    public static final String MISSING_REQUEST_PARAMETER_ERROR_CODE = "0003";

    public static final String METHOD_ARGUMENT_TYPE_MISMATCH_ERROR_CODE = "0005";

    public static final String METHOD_NOT_SUPPORTED_ERROR_CODE = "0006";

    public static final String MEDIA_TYPE_NOT_SUPPORTED_ERROR_CODE = "0007";

    public static final String BAD_ARGUMENTS_ERROR_CODE = "0008";

    public static final String PRODUCT_VALIDATION_ERROR_CODE = "0100";
    public static final String PRODUCT_NOT_FOUND_ERROR_CODE = "0101";

    public static final String BASKET_VALIDATION_ERROR_CODE = "0200";
    public static final String BASKET_NOT_FOUND_ERROR_CODE = "0201";
}
