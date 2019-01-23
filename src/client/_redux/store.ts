/*
 * This file provides a function to configer the redux store with the root reducer and router middleware
 */

import { createStore, applyMiddleware, Store } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router'
import { rootReducer, ApplicationState } from './index';

export default function configureStore(
    history: History
): Store<ApplicationState> {
    return createStore(
        rootReducer(history),
        applyMiddleware(
            routerMiddleware(history)
        ),
    );
}