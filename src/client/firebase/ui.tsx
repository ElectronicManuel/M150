import * as firebase from 'firebase';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui';

// Configure FirebaseUI.
const uiConfig: firebaseui.auth.Config = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInSuccessUrl: '/'
};

export class LoginComponent extends React.Component {
    render() {
        return (
            <StyledFirebaseAuth uiConfig={uiConfig } firebaseAuth={firebase.auth()} />
      );
    }
}