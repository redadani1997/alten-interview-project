import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { IProduct } from '../redux';
import productActions from '../redux/actions';
import DeleteProductComponent from './DeleteProductComponent';

interface DeleteProductProps {
    productToDelete: IProduct | null;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteProduct = ({
    productToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteProductProps) => {
    // Map State To Props
    const { isDeleteProductPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteProductPending: store.productReducer.isDeleteProductPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteProduct = () =>
        dispatch(
            productActions.deleteProduct(
                productToDelete.id,
                productToDelete.name,
            ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteProductComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteProduct={deleteProduct}
                isDeleteProductPending={isDeleteProductPending}
                productToDelete={productToDelete}
            />
        </>
    );
};

export default DeleteProduct;
