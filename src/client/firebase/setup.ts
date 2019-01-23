/*
 * This file loads firebase and configures it to work with the authentication server.
 */

import * as app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDvSIHTzB0SXKtnGxIVHLf9sty64xU3lYI",
    authDomain: "m150ebusiness.firebaseapp.com",
    projectId: "m150ebusiness"
};

app.initializeApp(config);