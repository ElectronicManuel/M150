import * as React from 'react';
import { LoginComponent } from 'client/firebase/ui';
import { Typography } from '@material-ui/core';

export class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <Typography variant='h3'>Login</Typography>
                <LoginComponent />
            </div>
        )
    }
}