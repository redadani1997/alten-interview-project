import { useDocumentTitle } from '@mantine/hooks';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import productActions from 'scenes/product/redux/actions';
import { IBasketItems } from '../redux';
import basketActions from '../redux/actions';
import BasketProductListComponent from './BasketProductListComponent';

const BasketProductList = () => {
    useDocumentTitle('Alten Project - Basket');

    // Map State To Props
    const { basket } = useSelector((store: ReduxStore) => {
        return {
            basket: store.basketReducer.basket,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const [getBasketId, setBasketId] = useCommonLocalStorage({
        key: 'ALTEN_PROJECT_BASKET_ID',
        fallback: '1',
    });

    const refreshPageContent = () => {
        dispatch(productActions.listProducts());
        dispatch(basketActions.listBasketItems(getBasketId()));
    };

    useEffect(() => {
        if (basket.id) {
            setBasketId(basket.id);
        }
    }, [basket]);

    const updateBasket = (
        id: string,
        basketItems: IBasketItems,
    ): Promise<any> => dispatch(basketActions.updateBasket(id, basketItems));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <BasketProductListComponent
            refreshPageContent={refreshPageContent}
            basket={basket}
            updateBasket={updateBasket}
        />
    );
};

export default BasketProductList;
