import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { IBasketItems } from '../redux';
import basketActions from '../redux/actions';
import BasketItemsComponent from './BasketItemsComponent';

interface BasketItemsProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    basketItems: IBasketItems;
    setBasketItems: (basketItems: IBasketItems) => void;
    onSuccess: () => void;
}

const BasketItems = ({
    isModalOpen,
    setIsModalOpen,
    onSuccess,
    basketItems,
    setBasketItems,
}: BasketItemsProps) => {
    // Map State To Props
    const {
        isDeleteBasketPending,
        isListBasketItemsPending,
        isPurchaseBasketPending,
        products,
    } = useSelector((store: ReduxStore) => {
        return {
            isDeleteBasketPending: store.basketReducer.isDeleteBasketPending,
            isListBasketItemsPending:
                store.basketReducer.isListBasketItemsPending,
            isPurchaseBasketPending:
                store.basketReducer.isPurchaseBasketPending,
            products: store.productReducer.products,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteBasket = (): Promise<any> =>
        dispatch(basketActions.deleteBasket(basketItems.id)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    const purchaseBasket = (): Promise<any> =>
        dispatch(basketActions.purchaseBasket(basketItems.id)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <BasketItemsComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteBasket={deleteBasket}
                purchaseBasket={purchaseBasket}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
                products={products}
                isActionPending={
                    isDeleteBasketPending ||
                    isPurchaseBasketPending ||
                    isListBasketItemsPending
                }
            />
        </>
    );
};

export default BasketItems;
