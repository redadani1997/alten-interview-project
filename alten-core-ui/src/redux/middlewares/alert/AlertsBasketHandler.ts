import { notifySuccess } from 'common/notifications/Notifications';
import basketTypes from 'scenes/basket/redux/types';

function handle(action): boolean {
    switch (action.type) {
        // Basket
        case basketTypes.PURCHASE_BASKET_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Basket Items Purchased Successfully.`,
            });
            return true;
        }
        case basketTypes.DELETE_BASKET_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Basket Deleted Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsBasketHandler = {
    handle,
};

export { AlertsBasketHandler };
