import { GET } from 'rest/RestCalls';
import settingsTypes from './types';

function checkBackendHealth() {
    return {
        type: settingsTypes.CHECK_BACKEND_HEALTH,
        payload: GET(`/health`).then(data => {
            // IMPORTANT: This is mandatory when the server hasn't started yet and
            //            the response is an HTML page due to caching.
            if (!data) {
                throw new Error(`Check Response is Malformed => '${data}'`);
            }
            return data;
        }),
        meta: { context: 'Health', ignoreNotification: true },
    };
}

const settingsActions = {
    checkBackendHealth,
};

export default settingsActions;
