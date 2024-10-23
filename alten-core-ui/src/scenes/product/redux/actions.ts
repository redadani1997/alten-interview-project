import { DELETE, GET, PATCH_FORM, POST_FORM } from 'rest/RestCalls';
import productTypes from './types';

export interface IProductCreateRequest {
    code: string;
    name: string;
    description: string;
    image: File;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shelfId: string;
    rating: number;
}

export interface IProductPatchRequest {
    code: string;
    name: string;
    description: string;
    image: File;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shelfId: string;
    rating: number;
}

function createProduct(request: IProductCreateRequest) {
    return {
        type: productTypes.CREATE_PRODUCT,
        payload: POST_FORM('/products', request),
        meta: {
            name: request.name,
            context: 'Product Creation',
        },
    };
}

function listProducts() {
    return {
        type: productTypes.LIST_PRODUCTS,
        payload: GET('/products'),
        meta: { context: 'Product' },
    };
}

function deleteProduct(id, name) {
    return {
        type: productTypes.DELETE_PRODUCT,
        payload: DELETE(`/products/${id}`),
        meta: { context: 'Product Deletion', name },
    };
}

function patchProduct(id, name, request: IProductPatchRequest) {
    return {
        type: productTypes.EDIT_PRODUCT,
        payload: PATCH_FORM(`/products/${id}`, request),
        meta: { context: 'Product Edit', name },
    };
}

function getProduct(id, name) {
    return {
        type: productTypes.GET_PRODUCT,
        payload: GET(`/products/${id}`),
        meta: { context: 'Product Details', name },
    };
}

const productActions = {
    createProduct,
    listProducts,
    deleteProduct,
    patchProduct,
    getProduct,
};

export default productActions;
