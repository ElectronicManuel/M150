import { RouterState, connectRouter } from 'connected-react-router';
import { UserState } from './users/types';
import { combineReducers, Reducer, Dispatch, Action } from 'redux';
import { History } from 'history';
import { UserReducer } from './users/reducers';
import { ProductsState } from './products/types';
import { ProductsReducer } from './products/reducers';
import { CartState } from './cart/types';
import { CartReducer } from './cart/reducers';

export interface ApplicationState {
    products: ProductsState
    shopping_cart: CartState
    router: RouterState
    user: UserState
}

export const rootReducer: (history: History) => Reducer<ApplicationState> = (history) => {
    let combinedReducers = combineReducers({
        router: connectRouter(history),
        user: UserReducer,
        products: ProductsReducer,
        shopping_cart: CartReducer
    });
    return combinedReducers;
};

export interface HasDispatch {
    dispatch: Dispatch<Action<any>>;
}

export const mapDispatch = (dispatch: Dispatch): HasDispatch => {
    return {
        dispatch
    }
}

export interface HasRouter {
    router: RouterState
}

export const mapRouter = (state: ApplicationState): HasRouter => {
    return {
        router: state.router
    }
}