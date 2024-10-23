import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { IBasketItems } from 'scenes/basket/redux';
import BasketProductListBodyComponent from './BasketProductListBodyComponent';

interface BasketProductListBodyProps {
    setIsBaskedModalOpen: (isModalOpen: boolean) => void;
    basketItems: IBasketItems;
    setBasketItems: (basketItems: IBasketItems) => void;
}

const BasketProductListBody = (props: BasketProductListBodyProps) => {
    // Map State To Props
    const { products, isListProductsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isListProductsPending:
                    store.productReducer.isListProductsPending,
                products: store.productReducer.products,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <BasketProductListBodyComponent
            {...props}
            isListProductsPending={isListProductsPending}
            products={products}
        />
    );
};

export default BasketProductListBody;
