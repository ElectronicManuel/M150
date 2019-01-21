import { SetUserAction } from './types';
import { User } from 'firebase';

export const setUser: (user?: User) => SetUserAction = (user) => {
    return {
        type: '@@user/SET_USER',
        payload: {
            user
        }
    }
}