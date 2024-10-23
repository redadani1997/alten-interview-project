import { notifyError } from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { AlertsBasketHandler } from './AlertsBasketHandler';
import { AlertsProductHandler } from './AlertsProductHandler';

function handleFulfilledActions(action, dispatch) {
    if (AlertsProductHandler.handle(action)) {
        return;
    }
    if (AlertsBasketHandler.handle(action)) {
        return;
    }
}

function handleRejectedActions(action, _) {
    const errorMessage = CommonUtils.getRestErrorMessage(action.payload);
    const errorContext = action.meta?.context;
    const ignoreNotification = action.meta?.ignoreNotification;
    if (errorContext && !ignoreNotification) {
        notifyError({ title: errorContext, message: errorMessage });
    }
}

function alertsMiddleware({ dispatch }) {
    return next => action => {
        if (action.type.endsWith('_REJECTED')) {
            handleRejectedActions(action, dispatch);
        }
        if (action.type.endsWith('_FULFILLED')) {
            handleFulfilledActions(action, dispatch);
        }

        return next(action);
    };
}

export default alertsMiddleware;
