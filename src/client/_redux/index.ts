/*
 * This file combines all sub states to an overarching application state and combines the sub reducers to a root reducer
 * It also contains some shortcut functions
 */

import { RouterState, connectRouter } from 'connected-react-router';
import { UserState } from './users/types';
import { combineReducers, Reducer, Dispatch, Action } from 'redux';
import { History } from 'history';
import { UserReducer } from './users/reducers';
import { ProductsState } from './products/types';
import { ProductsReducer } from './products/reducers';
import { CartState } from './cart/types';
import { CartReducer } from './cart/reducers';

// Merging all sub states to one interface
export interface ApplicationState {
    products: ProductsState
    shopping_cart: CartState
    router: RouterState
    user: UserState
}

// Merging all reducers to one root reducer
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

// Maps the dispatch function to props
export const mapDispatch = (dispatch: Dispatch): HasDispatch => {
    return {
        dispatch
    }
}

export interface HasRouter {
    router: RouterState
}

// Maps the router state to props
export const mapRouter = (state: ApplicationState): HasRouter => {
    return {
        router: state.router
    }
}

// Maps the application state to props
export const mapAppState = (state: ApplicationState): ApplicationState => {
    return {
        ...state
    }
}