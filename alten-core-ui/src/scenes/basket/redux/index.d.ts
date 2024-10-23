export interface IBasketItem {
    productId: number;
    quantity: number;
}

export interface IBasketItems {
    id?: string;
    items: IBasketItem[];
}

export type BasketReducerState = {
    isDeleteBasketPending: boolean;
    isPurchaseBasketPending: boolean;
    isUpdateBasketPending: boolean;
    isListBasketItemsPending: boolean;
    basket: IBasketItems;
};
