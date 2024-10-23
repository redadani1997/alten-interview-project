import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { IoMdBasket } from 'react-icons/io';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface BasketProductListHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    productsLength: number;
    setIsBaskedModalOpen: (isOpen: boolean) => void;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    productsLength,
    setIsBaskedModalOpen,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Basket"
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
                onClick={() => setIsBaskedModalOpen(true)}
                leftIcon={<IoMdBasket size={22} />}
            >
                Open Basket
            </Button>
        </div>
    );
}

function BasketProductListHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    productsLength,
    setIsBaskedModalOpen,
}: BasketProductListHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        productsLength,
        setIsBaskedModalOpen,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Basket',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default BasketProductListHeaderComponent;
