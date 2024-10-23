import { ReduxAction } from 'redux_config/.';
import { SettingsReducerState } from '.';
import settingsTypes from './types';

const initialState: SettingsReducerState = {
    isHealthCheckPending: true,
};

function settingsReducer(
    state = initialState,
    action: ReduxAction,
): SettingsReducerState {
    switch (action.type) {
        // CHECK_BACKEND_HEALTH
        case settingsTypes.CHECK_BACKEND_HEALTH_PENDING:
            return {
                ...state,
                isHealthCheckPending: true,
            };
        case settingsTypes.CHECK_BACKEND_HEALTH_FULFILLED:
            return {
                ...state,
                isHealthCheckPending: false,
            };
        case settingsTypes.CHECK_BACKEND_HEALTH_REJECTED:
            return {
                ...state,
                isHealthCheckPending: true,
            };

        default:
            return state;
    }
}

export default settingsReducer;
