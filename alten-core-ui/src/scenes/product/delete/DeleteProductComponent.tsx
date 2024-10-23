import { Alert, Button, Text } from '@mantine/core';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import { IProduct } from '../redux';

interface DeleteProductComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteProduct: () => Promise<any>;
    isDeleteProductPending: boolean;
    productToDelete: IProduct | null;
}

function renderModalBody() {
    return (
        <>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>Please confirm Product Deletion.</Text>
            </Alert>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="red"
                leftIcon={<TbTrash size="1rem" />}
                onClick={() => action()}
            >
                Delete
            </Button>
        </div>
    );
}

function DeleteProductComponent({
    setIsModalOpen,
    isModalOpen,
    isDeleteProductPending,
    productToDelete,
    deleteProduct,
}: DeleteProductComponentProps) {
    const action = () => deleteProduct();

    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Delete Product Rule</Text>
                    <Text color="dimmed" size="xs">
                        {productToDelete?.name}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteProductPending}
        />
    );
}

export default DeleteProductComponent;
