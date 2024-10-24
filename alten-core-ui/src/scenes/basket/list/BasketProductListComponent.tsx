import { useEffect, useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import BasketItems from '../items/BasketItems';
import { IBasketItems } from '../redux';
import BasketProductListBody from './body/BasketProductListBody';
import BasketProductListHeader from './header/BasketProductListHeader';

interface BasketProductListComponentProps {
    refreshPageContent: () => void;
    basket: IBasketItems;
    updateBasket: (id: string, basketItems: IBasketItems) => Promise<any>;
}

function BasketProductListComponent({
    refreshPageContent,
    basket,
    updateBasket,
}: BasketProductListComponentProps) {
    const [isBasketModalOpen, setIsBaskedModalOpen] = useState(false);
    const [basketItems, setBasketItems] = useState<IBasketItems>({ items: [] });

    useEffect(() => {
        setBasketItems(basket);
    }, [basket]);

    useEffect(() => {
        if (basketItems.id) {
            updateBasket(basketItems.id, basketItems);
        }
    }, [basketItems]);

    return (
        <>
            <BasketProductListHeader
                refreshPageContent={refreshPageContent}
                setIsBaskedModalOpen={setIsBaskedModalOpen}
            />
            <CommonBody>
                <BasketProductListBody
                    setIsBaskedModalOpen={setIsBaskedModalOpen}
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                />
            </CommonBody>
            <BasketItems
                basketItems={basketItems}
                setBasketItems={setBasketItems}
                isModalOpen={isBasketModalOpen}
                setIsModalOpen={setIsBaskedModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default BasketProductListComponent;
