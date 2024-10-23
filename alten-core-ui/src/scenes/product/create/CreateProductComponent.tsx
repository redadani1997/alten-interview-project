import { Button, Grid, Rating, Text } from '@mantine/core';
import camelCase from 'lodash.camelcase';
import { useState } from 'react';
import { TbPlus, TbX } from 'react-icons/tb';
import CommonDropzone from 'scenes/common/dropzone/CommonDropzone';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextarea from 'scenes/common/input/CommonTextarea';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import { IProductCreateRequest } from '../redux/actions';

interface CreateProductComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    createProduct: (request: IProductCreateRequest) => Promise<any>;
    isCreateProductPending: boolean;
}

function renderModalBody(
    product: IProductCreateRequest,
    setProduct: (product: IProductCreateRequest) => void,
) {
    return (
        <>
            <Grid className="items-end">
                <Grid.Col span={12} md={6}>
                    <CommonTextInput
                        required
                        label="Name"
                        placeholder="Amazing Product"
                        onChange={value => {
                            setProduct({
                                ...product,
                                name: value,
                                code: camelCase(value),
                            });
                        }}
                        error={!product.code}
                        value={product.name}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6}>
                    <CommonTextInput
                        required
                        label="Code"
                        placeholder="amazingProduct"
                        value={product.code}
                        disabled
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <CommonTextarea
                        required
                        label="Description"
                        placeholder="Select a Desciption"
                        minRows={3}
                        maxRows={6}
                        onChange={e =>
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                        value={product.description}
                        error={!product.description}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={4}>
                    <CommonTextInput
                        required
                        label="Category"
                        placeholder="Category"
                        onChange={value => {
                            setProduct({
                                ...product,
                                category: value,
                            });
                        }}
                        error={!product.category}
                        value={product.category}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={4}>
                    <CommonNumberInput
                        required
                        label="Price"
                        placeholder="Price"
                        onChange={value => {
                            setProduct({
                                ...product,
                                price: value,
                            });
                        }}
                        min={0}
                        error={
                            product.price === null ||
                            product.price === undefined
                        }
                        value={product.price}
                        rightSection="€"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={4}>
                    <CommonNumberInput
                        required
                        label="Quantity"
                        placeholder="Quantity"
                        onChange={value => {
                            setProduct({
                                ...product,
                                quantity: value,
                            });
                        }}
                        min={0}
                        error={
                            product.quantity === null ||
                            product.quantity === undefined
                        }
                        value={product.quantity}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={4}>
                    <CommonTextInput
                        required
                        label="Shelf Id"
                        placeholder="Shelf Id"
                        onChange={value => {
                            setProduct({
                                ...product,
                                shelfId: value,
                            });
                        }}
                        error={!product.shelfId}
                        value={product.shelfId}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={4}>
                    <CommonTextInput
                        required
                        label="Internal Reference"
                        placeholder="Internal Reference"
                        onChange={value => {
                            setProduct({
                                ...product,
                                internalReference: value,
                            });
                        }}
                        error={!product.internalReference}
                        value={product.internalReference}
                    />
                </Grid.Col>
                <Grid.Col
                    span={12}
                    md={4}
                    className="flex flex-col content-between"
                >
                    <Text className="pb-4 font-medium">Rating</Text>
                    <Rating
                        value={product.rating}
                        onChange={value =>
                            setProduct({ ...product, rating: value })
                        }
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <CommonDropzone
                        acceptedFiles={['image/png', 'image/jpeg']}
                        droppedFile={product.image}
                        onDrop={file => {
                            setProduct({
                                ...product,
                                image: file,
                            });
                        }}
                        title="Product Image"
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}

function renderModalFooter(
    product: IProductCreateRequest,
    setIsModalOpen,
    action,
) {
    const disabled =
        !product.name ||
        !product.code ||
        !product.description ||
        !product.category ||
        !product.price ||
        !product.quantity ||
        !product.shelfId ||
        !product.internalReference ||
        !product.rating;
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
                color="blue"
                leftIcon={<TbPlus size="1rem" />}
                onClick={() => action()}
                disabled={disabled}
            >
                Create
            </Button>
        </div>
    );
}

function CreateProductComponent({
    setIsModalOpen,
    isModalOpen,
    isCreateProductPending,
    createProduct,
}: CreateProductComponentProps) {
    const [product, setProduct] = useState<IProductCreateRequest>({
        name: '',
        code: '',
        price: 1100,
        quantity: 20,
        internalReference: 'AC123',
        shelfId: 'Aisle 7, Shlef 3',
        rating: 3,
        category: 'Electronics',
        description: 'This Product is amazing!!',
        image: null,
    });

    const action = () => createProduct(product);

    const modalBody = renderModalBody(product, setProduct);
    const modalFooter = renderModalFooter(product, setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Create Product</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isCreateProductPending}
        />
    );
}

export default CreateProductComponent;
