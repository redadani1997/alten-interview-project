export interface IProduct {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shelfId: number;
    inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    rating: number;
    createdAt: number;
    updatedAt: number;
}

export type ProductReducerState = {
    isCreateProductPending: boolean;
    isDeleteProductPending: boolean;
    isEditProductPending: boolean;
    isListProductsPending: boolean;
    isGetProductPending: boolean;
    products: IProduct[];
    productDetails: IProduct | null;
};
