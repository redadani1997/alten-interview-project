import { notifySuccess } from 'common/notifications/Notifications';
import productTypes from 'scenes/product/redux/types';

function handle(action): boolean {
    switch (action.type) {
        // Product
        case productTypes.CREATE_PRODUCT_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `Product '${name}' Created Successfully.`,
            });
            return true;
        }
        case productTypes.EDIT_PRODUCT_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `Product '${name}' Edited Successfully.`,
            });
            return true;
        }
        case productTypes.DELETE_PRODUCT_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `Product '${name}' Deleted Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsProductHandler = {
    handle,
};

export { AlertsProductHandler };
