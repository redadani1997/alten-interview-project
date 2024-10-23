import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ProductListHeaderComponent from './ProductListHeaderComponent';

interface ProductListHeaderProps {
    refreshPageContent: () => void;
}

const ProductListHeader = ({ refreshPageContent }: ProductListHeaderProps) => {
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
        <ProductListHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isListProductsPending}
            productsLength={products.length}
        />
    );
};

export default ProductListHeader;
