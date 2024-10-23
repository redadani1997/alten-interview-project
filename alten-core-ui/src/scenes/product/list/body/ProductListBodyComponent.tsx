import {
    ActionIcon,
    Avatar,
    Rating,
    Text,
    ThemeIcon,
    Tooltip,
} from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo } from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { MdCheck, MdError } from 'react-icons/md';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { IProduct } from 'scenes/product/redux';

interface ProductListBodyComponentProps {
    products?: IProduct[];
    isListProductsPending: boolean;
    setProductToDelete: (product: IProduct) => void;
    setIsDeleteProductModalOpen: (isModalOpen: boolean) => void;
    setProductToEdit: (product: IProduct) => void;
    setIsEditProductModalOpen: (isModalOpen: boolean) => void;
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
        {
            id: 'createdAt',
            label: 'Created At',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '15%',
        },
        {
            id: 'updatedAt',
            label: 'Updated At',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '15%',
        },
    ];
}

function getData(
    products: IProduct[],
    setProductToDelete: (product: IProduct) => void,
    setIsDeleteProductModalOpen: (isModalOpen: boolean) => void,
    setProductToEdit: (product: IProduct) => void,
    setIsEditProductModalOpen: (isModalOpen: boolean) => void,
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
                        <Tooltip label="Edit">
                            <ActionIcon
                                color="blue"
                                onClick={() => {
                                    setProductToEdit(product);
                                    setIsEditProductModalOpen(true);
                                }}
                            >
                                <TbPencil size="1.3rem" />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                            <ActionIcon
                                className="ml-1"
                                color="red"
                                onClick={() => {
                                    setProductToDelete(product);
                                    setIsDeleteProductModalOpen(true);
                                }}
                            >
                                <TbTrash size="1.3rem" />
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
        createdAt: {
            value: product.createdAt,
            displayedValue: CommonTimeUtils.timestampToFormattedDate(
                product.createdAt,
                undefined,
                undefined,
            ),
        },
        updatedAt: {
            value: product.updatedAt,
            displayedValue: CommonTimeUtils.timestampToFormattedDate(
                product.updatedAt,
                undefined,
                undefined,
            ),
        },
    }));
}

const ProductListBodyComponent = ({
    products,
    isListProductsPending,
    setProductToDelete,
    setIsDeleteProductModalOpen,
    setProductToEdit,
    setIsEditProductModalOpen,
}: ProductListBodyComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(
            products,
            setProductToDelete,
            setIsDeleteProductModalOpen,
            setProductToEdit,
            setIsEditProductModalOpen,
        );
    }, [products]);
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

export default ProductListBodyComponent;
