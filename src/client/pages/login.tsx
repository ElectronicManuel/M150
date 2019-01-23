/*
 * The LoginPage component contains the login page
 */

import * as React from 'react';
import { LoginComponent } from 'client/firebase/ui';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapAppState, ApplicationState } from 'client/_redux';

class LoginPageBase extends React.Component<ApplicationState, any> {
    render() {
        return (
            <div>
                <Typography variant='h3'>Anmelden</Typography>
                {
                    this.props.user.user ?
                    <Typography>Du bist bereits angemeldet</Typography>
                    :
                    <LoginComponent />
                }
            </div>
        )
    }
}

export const LoginPage = connect(mapAppState, null)(LoginPageBase);