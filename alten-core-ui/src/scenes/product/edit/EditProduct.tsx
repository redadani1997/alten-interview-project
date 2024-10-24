import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { IProduct } from '../redux';
import productActions, { IProductPatchRequest } from '../redux/actions';
import EditProductComponent from './EditProductComponent';

interface EditProductProps {
    productToEdit: IProduct;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const EditProduct = ({
    productToEdit,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: EditProductProps) => {
    // Map State To Props
    const { isEditProductPending } = useSelector((store: ReduxStore) => {
        return {
            isEditProductPending: store.productReducer.isEditProductPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const patchProduct = (request: IProductPatchRequest): Promise<any> =>
        dispatch(
            productActions.patchProduct(
                productToEdit?.id,
                productToEdit?.code,
                request,
            ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <EditProductComponent
                productToEdit={productToEdit}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                patchProduct={patchProduct}
                isEditProductPending={isEditProductPending}
            />
        </>
    );
};

export default EditProduct;
