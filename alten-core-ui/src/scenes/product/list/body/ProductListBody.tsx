import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { IProduct } from 'scenes/product/redux';
import ProductListBodyComponent from './ProductListBodyComponent';

interface ProductListBodyProps {
    setProductToDelete: (product: IProduct) => void;
    setIsDeleteProductModalOpen: (isModalOpen: boolean) => void;
    setProductToEdit: (product: IProduct) => void;
    setIsEditProductModalOpen: (isModalOpen: boolean) => void;
}

const ProductListBody = (props: ProductListBodyProps) => {
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
        <ProductListBodyComponent
            {...props}
            isListProductsPending={isListProductsPending}
            products={products}
        />
    );
};

export default ProductListBody;
