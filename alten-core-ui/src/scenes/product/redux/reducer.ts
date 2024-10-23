import { ReduxAction } from 'redux_config/.';
import { ProductReducerState } from '.';
import productTypes from './types';

const initialState: ProductReducerState = {
    products: [],
    productDetails: null,
    isGetProductPending: false,
    isListProductsPending: false,
    isCreateProductPending: false,
    isDeleteProductPending: false,
    isEditProductPending: false,
};

function productReducer(
    state = initialState,
    action: ReduxAction,
): ProductReducerState {
    switch (action.type) {
        // CREATE_PRODUCT
        case productTypes.CREATE_PRODUCT_PENDING:
            return {
                ...state,
                isCreateProductPending: true,
            };
        case productTypes.CREATE_PRODUCT_FULFILLED:
        case productTypes.CREATE_PRODUCT_REJECTED:
            return {
                ...state,
                isCreateProductPending: false,
            };

        // LIST_PRODUCTS
        case productTypes.LIST_PRODUCTS_PENDING:
            return {
                ...state,
                isListProductsPending: true,
            };
        case productTypes.LIST_PRODUCTS_FULFILLED:
            return {
                ...state,
                products: action.payload,
                isListProductsPending: false,
            };
        case productTypes.LIST_PRODUCTS_REJECTED:
            return {
                ...state,
                isListProductsPending: false,
                products: [],
            };

        // DELETE_PRODUCT
        case productTypes.DELETE_PRODUCT_PENDING:
            return {
                ...state,
                isDeleteProductPending: true,
            };
        case productTypes.DELETE_PRODUCT_FULFILLED:
        case productTypes.DELETE_PRODUCT_REJECTED:
            return {
                ...state,
                isDeleteProductPending: false,
            };

        // EDIT_PRODUCT
        case productTypes.EDIT_PRODUCT_PENDING:
            return {
                ...state,
                isEditProductPending: true,
            };
        case productTypes.EDIT_PRODUCT_FULFILLED:
        case productTypes.EDIT_PRODUCT_REJECTED:
            return {
                ...state,
                isEditProductPending: false,
            };

        // GET_PRODUCT
        case productTypes.GET_PRODUCT_PENDING:
            return {
                ...state,
                isGetProductPending: true,
            };
        case productTypes.GET_PRODUCT_FULFILLED:
            return {
                ...state,
                isGetProductPending: false,
                productDetails: action.payload,
            };
        case productTypes.GET_PRODUCT_REJECTED:
            return {
                ...state,
                isGetProductPending: false,
            };

        default:
            return state;
    }
}

export default productReducer;
