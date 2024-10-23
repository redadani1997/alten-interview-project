import { ReduxAction } from 'redux_config/.';
import { BasketReducerState } from '.';
import basketTypes from './types';

const initialState: BasketReducerState = {
    basket: {
        items: [],
    },
    isDeleteBasketPending: false,
    isListBasketItemsPending: false,
    isPurchaseBasketPending: false,
    isUpdateBasketPending: false,
};

function basketReducer(
    state = initialState,
    action: ReduxAction,
): BasketReducerState {
    switch (action.type) {
        // UPDATE_BASKET
        case basketTypes.UPDATE_BASKET_PENDING:
            return {
                ...state,
                isUpdateBasketPending: true,
            };
        case basketTypes.UPDATE_BASKET_FULFILLED:
        case basketTypes.UPDATE_BASKET_REJECTED:
            return {
                ...state,
                isUpdateBasketPending: false,
            };

        // LIST_BASKET_ITEMS
        case basketTypes.LIST_BASKET_ITEMS:
            return {
                ...state,
                isListBasketItemsPending: true,
            };
        case basketTypes.LIST_BASKET_ITEMS_FULFILLED:
            return {
                ...state,
                basket: action.payload,
                isListBasketItemsPending: false,
            };
        case basketTypes.LIST_BASKET_ITEMS_REJECTED:
            return {
                ...state,
                isListBasketItemsPending: false,
                basket: {
                    items: [],
                },
            };

        // DELETE_BASKET
        case basketTypes.DELETE_BASKET_PENDING:
            return {
                ...state,
                isDeleteBasketPending: true,
            };
        case basketTypes.DELETE_BASKET_FULFILLED:
        case basketTypes.DELETE_BASKET_REJECTED:
            return {
                ...state,
                isDeleteBasketPending: false,
            };

        // PURCHASE_BASKET
        case basketTypes.PURCHASE_BASKET_PENDING:
            return {
                ...state,
                isPurchaseBasketPending: true,
            };
        case basketTypes.PURCHASE_BASKET_FULFILLED:
        case basketTypes.PURCHASE_BASKET_REJECTED:
            return {
                ...state,
                isPurchaseBasketPending: false,
            };

        default:
            return state;
    }
}

export default basketReducer;
