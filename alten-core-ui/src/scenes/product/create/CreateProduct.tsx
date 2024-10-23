import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import productActions, {
    IProductCreateRequest
} from '../redux/actions';
import CreateProductComponent from './CreateProductComponent';

interface CreateProductProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const CreateProduct = ({
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: CreateProductProps) => {
    // Map State To Props
    const { isCreateProductPending } = useSelector((store: ReduxStore) => {
        return {
            isCreateProductPending: store.productReducer.isCreateProductPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const createProduct = (request: IProductCreateRequest): Promise<any> =>
        dispatch(productActions.createProduct(request)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <CreateProductComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                createProduct={createProduct}
                isCreateProductPending={isCreateProductPending}
            />
        </>
    );
};

export default CreateProduct;
