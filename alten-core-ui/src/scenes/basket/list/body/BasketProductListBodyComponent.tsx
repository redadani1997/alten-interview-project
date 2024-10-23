import {
    ActionIcon,
    Avatar,
    Rating,
    Text,
    ThemeIcon,
    Tooltip,
} from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo } from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { IoMdBasket } from 'react-icons/io';
import { MdCheck, MdError } from 'react-icons/md';
import { IBasketItems } from 'scenes/basket/redux';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { IProduct } from 'scenes/product/redux';

interface BasketProductListBodyComponentProps {
    products?: IProduct[];
    isListProductsPending: boolean;
    setIsBaskedModalOpen: (isModalOpen: boolean) => void;
    basketItems: IBasketItems;
    setBasketItems: (basketItems: IBasketItems) => void;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '40%',
        },
        {
            id: 'category',
            label: 'Category',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
        {
            id: 'price',
            label: 'Price',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
        {
            id: 'quantity',
            label: 'Quantity',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'rating',
            label: 'Rating',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
    ];
}

function getData(
    products: IProduct[],
    setIsBaskedModalOpen: (isModalOpen: boolean) => void,
    basketItems: IBasketItems,
    setBasketItems: (basketItems: IBasketItems) => void,
): CommonTableData[] {
    return products.map(product => ({
        name: {
            value: product.name,
            displayedValue: (
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-3">
                        <Avatar
                            size="sm"
                            src={
                                product.image
                                    ? `data:image/jpeg;base64, ${product.image}`
                                    : ''
                            }
                            alt={product.name}
                        />
                        {product.name}
                    </div>
                    <div className="pl-2 flex">
                        <Tooltip label="Add to basket">
                            <ActionIcon
                                color="blue"
                                onClick={() => {
                                    setIsBaskedModalOpen(true);
                                    const existingItem = basketItems.items.find(
                                        item => item.productId === product.id,
                                    );
                                    if (!existingItem) {
                                        setBasketItems({
                                            ...basketItems,
                                            items: [
                                                ...basketItems.items,
                                                {
                                                    productId: product.id,
                                                    quantity: 1,
                                                },
                                            ],
                                        });
                                    } else {
                                        setBasketItems({
                                            ...basketItems,
                                            items: basketItems.items.map(item =>
                                                item.productId === product.id
                                                    ? {
                                                          ...item,
                                                          quantity:
                                                              item.quantity + 1,
                                                      }
                                                    : item,
                                            ),
                                        });
                                    }
                                }}
                            >
                                <IoMdBasket size="1.3rem" />
                            </ActionIcon>
                        </Tooltip>
                    </div>
                </div>
            ),
        },
        category: {
            value: product.category,
            displayedValue: product.category,
        },
        price: {
            value: product.price,
            displayedValue: `${CommonUtils.beautifyNumber(product.price)} €`,
        },
        quantity: {
            value: product.quantity,
            displayedValue: (
                <div className="flex gap-2 items-center justify-between">
                    <Text>{product.quantity}</Text>
                    <div>
                        {product.inventoryStatus === 'INSTOCK' ? (
                            <Tooltip label="In Stock">
                                <ThemeIcon variant="outline" color="green">
                                    <MdCheck />
                                </ThemeIcon>
                            </Tooltip>
                        ) : product.inventoryStatus === 'LOWSTOCK' ? (
                            <Tooltip label="Low Stock">
                                <ThemeIcon variant="outline" color="yellow">
                                    <FaTriangleExclamation />
                                </ThemeIcon>
                            </Tooltip>
                        ) : (
                            <Tooltip label="Out of Stock">
                                <ThemeIcon variant="outline" color="red">
                                    <MdError />
                                </ThemeIcon>
                            </Tooltip>
                        )}
                    </div>
                </div>
            ),
        },
        rating: {
            value: product.rating,
            displayedValue: <Rating value={product.rating} readOnly />,
        },
    }));
}

const BasketProductListBodyComponent = ({
    products,
    isListProductsPending,
    setIsBaskedModalOpen,
    basketItems,
    setBasketItems,
}: BasketProductListBodyComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(
            products,
            setIsBaskedModalOpen,
            basketItems,
            setBasketItems,
        );
    }, [products, setIsBaskedModalOpen, basketItems, setBasketItems]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={products.length}
            perPage={10}
            isLoading={isListProductsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default BasketProductListBodyComponent;
