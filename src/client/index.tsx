import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    render() {
        return (
            <div>
                <p>Test 2</p>
                <button onClick={async () => {
                    try {
                        const result = await axios.get('/test');
                        alert(result.data);
                    } catch(err) {
                        alert(JSON.stringify(err));
                    }
                }}>Request</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));