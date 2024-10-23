import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import BasketProductListHeaderComponent from './BasketProductListHeaderComponent';

interface BasketProductListHeaderProps {
    refreshPageContent: () => void;
    setIsBaskedModalOpen: (isOpen: boolean) => void;
}

const BasketProductListHeader = ({
    refreshPageContent,
    setIsBaskedModalOpen,
}: BasketProductListHeaderProps) => {
    // Map State To Props
    const { isListProductsPending, products } = useSelector(
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
        <BasketProductListHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isListProductsPending}
            productsLength={products.length}
            setIsBaskedModalOpen={setIsBaskedModalOpen}
        />
    );
};

export default BasketProductListHeader;
