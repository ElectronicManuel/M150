import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './firebase/setup';
import { Fetcher } from './fetcher';
import { ReduxProvider } from './_redux/redux-provider';
import { ThemeHandler } from './theme-handler';
import 'react-image-lightbox/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReduxProvider>
                <Fetcher>
                    <ThemeHandler />
                </Fetcher>
            </ReduxProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));