import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteProduct from '../delete/DeleteProduct';
import EditProduct from '../edit/EditProduct';
import { IProduct } from '../redux';
import ProductListBody from './body/ProductListBody';
import ProductListHeader from './header/ProductListHeader';

interface ProductListComponentProps {
    refreshPageContent: () => void;
}

function ProductListComponent({
    refreshPageContent,
}: ProductListComponentProps) {
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(
        null,
    );
    const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
        useState(false);

    const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

    return (
        <>
            <ProductListHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <ProductListBody
                    setProductToDelete={setProductToDelete}
                    setIsDeleteProductModalOpen={setIsDeleteProductModalOpen}
                    setProductToEdit={setProductToEdit}
                    setIsEditProductModalOpen={setIsEditProductModalOpen}
                />
            </CommonBody>
            <DeleteProduct
                productToDelete={productToDelete}
                isModalOpen={isDeleteProductModalOpen}
                setIsModalOpen={setIsDeleteProductModalOpen}
                onSuccess={refreshPageContent}
            />
            <EditProduct
                productToEdit={productToEdit}
                isModalOpen={isEditProductModalOpen}
                setIsModalOpen={setIsEditProductModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default ProductListComponent;
