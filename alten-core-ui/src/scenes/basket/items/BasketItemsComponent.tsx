import { ActionIcon, Alert, Button, Divider, Grid, Text } from '@mantine/core';
import { IoMdBasket } from 'react-icons/io';
import { TbAlertTriangle, TbX } from 'react-icons/tb';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import { IProduct } from 'scenes/product/redux';
import { IBasketItems } from '../redux';

interface BasketItemsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteBasket: () => Promise<any>;
    purchaseBasket: () => Promise<any>;
    basketItems: IBasketItems;
    setBasketItems: (basketItems: IBasketItems) => void;
    isActionPending: boolean;
    products: IProduct[];
}

function renderModalBody(
    basketItems: IBasketItems,
    setBasketItems: (basketItems: IBasketItems) => void,
    products: IProduct[],
) {
    if (basketItems.items.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Warning"
                color="lime"
            >
                <Text className="pb-4">Empty Basket</Text>
                <Text>Go back to list and pick products</Text>
            </Alert>
        );
    }
    const totalQuantity = basketItems.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
    );
    const totalAmount = basketItems.items.reduce((acc, item) => {
        const product = products.find(product => product.id === item.productId);
        if (!product) return acc;
        return acc + product.price * item.quantity;
    }, 0);
    return (
        <div className="flex flex-col">
            {basketItems.items.map(item => {
                const product = products.find(
                    product => product.id === item.productId,
                );
                if (!product) return null;
                return (
                    <Grid className="items-end" key={item.productId}>
                        <Grid.Col span={12} sm={4}>
                            <CommonTextInput
                                disabled
                                label="Product"
                                placeholder="Product"
                                value={product.name}
                            />
                        </Grid.Col>
                        <Grid.Col span={12} sm={4}>
                            <CommonNumberInput
                                required
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={value => {
                                    setBasketItems({
                                        ...basketItems,
                                        items: basketItems.items.map(
                                            basketItem =>
                                                basketItem.productId ===
                                                item.productId
                                                    ? {
                                                          ...basketItem,
                                                          quantity: value,
                                                      }
                                                    : basketItem,
                                        ),
                                    });
                                }}
                                min={1}
                                max={product.quantity}
                                value={item.quantity}
                            />
                        </Grid.Col>
                        <Grid.Col span={12} sm={3}>
                            <CommonNumberInput
                                disabled
                                label="Sub Total"
                                placeholder="Sub Total"
                                min={1}
                                value={item.quantity * product.price}
                            />
                        </Grid.Col>
                        <Grid.Col span={12} sm={1}>
                            <ActionIcon
                                color="red"
                                onClick={() => {
                                    setBasketItems({
                                        ...basketItems,
                                        items: basketItems.items.filter(
                                            basketItem =>
                                                basketItem.productId !==
                                                item.productId,
                                        ),
                                    });
                                }}
                            >
                                <TbX size="1.4rem" />
                            </ActionIcon>
                        </Grid.Col>
                        <Divider className="my-4" />
                    </Grid>
                );
            })}
            <Text className="pt-4 pb-2">
                Total quantity: <b>{totalQuantity}</b>
            </Text>
            <Text className="pb-2">
                Total amount: <b>{totalAmount} €</b>
            </Text>
        </div>
    );
}

function renderModalFooter(
    basketItems: IBasketItems,
    deleteBasket,
    purchaseBasket,
) {
    const disabled = basketItems.items.length === 0;
    return (
        <div className="flex justify-between">
            <Button
                disabled={disabled}
                color="red"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => deleteBasket()}
            >
                Delete
            </Button>
            <Button
                color="blue"
                leftIcon={<IoMdBasket size="1rem" />}
                onClick={() => purchaseBasket()}
                disabled={disabled}
            >
                Purchase
            </Button>
        </div>
    );
}

function BasketItemsComponent({
    setIsModalOpen,
    isModalOpen,
    basketItems,
    deleteBasket,
    isActionPending,
    purchaseBasket,
    setBasketItems,
    products,
}: BasketItemsComponentProps) {
    const modalBody = renderModalBody(basketItems, setBasketItems, products);
    const modalFooter = renderModalFooter(
        basketItems,
        deleteBasket,
        purchaseBasket,
    );

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Basket</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isActionPending}
        />
    );
}

export default BasketItemsComponent;
