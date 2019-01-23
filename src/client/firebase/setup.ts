import * as app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDvSIHTzB0SXKtnGxIVHLf9sty64xU3lYI",
    authDomain: "m150ebusiness.firebaseapp.com",
    databaseURL: "https://m150ebusiness.firebaseio.com",
    projectId: "m150ebusiness",
    storageBucket: "m150ebusiness.appspot.com",
    messagingSenderId: "1043034958596"
};

app.initializeApp(config);