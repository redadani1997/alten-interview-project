import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import { IBasketItems } from '.';
import basketTypes from './types';

function updateBasket(id: string, request: IBasketItems) {
    return {
        type: basketTypes.UPDATE_BASKET,
        payload: PUT(`/baskets/${id}/items`, request),
        meta: {
            context: 'Basket Update',
        },
    };
}

function listBasketItems(id: string) {
    return {
        type: basketTypes.LIST_BASKET_ITEMS,
        payload: GET(`/baskets/${id}/items`),
        meta: { context: 'Basket' },
    };
}

function deleteBasket(id) {
    return {
        type: basketTypes.DELETE_BASKET,
        payload: DELETE(`/baskets/${id}/items`),
        meta: { context: 'Basket Deletion' },
    };
}

function purchaseBasket(id) {
    return {
        type: basketTypes.PURCHASE_BASKET,
        payload: POST(`/baskets/${id}/items`, null),
        meta: { context: 'Basket Purchase' },
    };
}

const basketActions = {
    updateBasket,
    listBasketItems,
    deleteBasket,
    purchaseBasket,
};

export default basketActions;
