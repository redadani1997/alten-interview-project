import { combineReducers, Reducer } from 'redux';
import { BasketReducerState } from 'scenes/basket/redux';
import basketReducer from 'scenes/basket/redux/reducer';
import { RouteReducerState } from 'scenes/main/navbar/redux';
import routeReducer from 'scenes/main/navbar/redux/reducer';
import { ProductReducerState } from 'scenes/product/redux';
import productReducer from 'scenes/product/redux/reducer';
import { SettingsReducerState } from 'scenes/settings/redux';
import settingsReducer from 'scenes/settings/redux/reducer';

const reducers: Reducer = combineReducers({
    routeReducer,
    settingsReducer,
    productReducer,
    basketReducer,
});

export default reducers;

export type ReduxStore = {
    routeReducer: RouteReducerState;
    settingsReducer: SettingsReducerState;
    productReducer: ProductReducerState;
    basketReducer: BasketReducerState;
};
