import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import CreateProduct from 'scenes/product/create/CreateProduct';

interface ProductListHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    productsLength: number;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    productsLength,
    setIsCreateModalOpen,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Products"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Products">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(productsLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            <Button
                onClick={() => setIsCreateModalOpen(true)}
                leftIcon={<TbCirclePlus size={22} />}
            >
                Create Product
            </Button>
        </div>
    );
}

function ProductListHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    productsLength,
}: ProductListHeaderComponentProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        productsLength,
        setIsCreateModalOpen,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Product',
                    },
                ]}
                title={title}
            />
            <CreateProduct
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default ProductListHeaderComponent;
