import * as admin from 'firebase-admin';

const serviceAccountOrPath = process.env.M150_SERVICE_ACCOUNT;

let credential: string | admin.ServiceAccount = serviceAccountOrPath || '';

if (serviceAccountOrPath) {
    try {
        credential = JSON.parse(serviceAccountOrPath);
    } catch (err) {
    }
    admin.initializeApp({
        credential: admin.credential.cert(credential),
        databaseURL: "https://m150ebusiness.firebaseio.com"
    });
} else {
    console.error('No firebase service account found')
}

export {
    admin
}