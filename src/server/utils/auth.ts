import { admin } from 'server/db';

// Verifies ID Token and returns decoded object
export const verifyIdToken = async (idToken) => {
    let decodedToken: admin.auth.DecodedIdToken;
    try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch(err) {
        throw {
            code: 403,
            error: {
                message: 'Du musst angemeldet sein.'
            }
        }
    }
}