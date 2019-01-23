/*
 * The ReduxProvider component creates the redux store and provides it to its children through context
 * It also configures the browser history and the react router to enable routing in the single page application
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store';

const history = createBrowserHistory();
const store = configureStore(history);

export class ReduxProvider extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {this.props.children}
                </ConnectedRouter>
            </Provider>
        )
    }
}