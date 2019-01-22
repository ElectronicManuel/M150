import { Action } from 'redux';
import { User } from 'firebase';

export type UserState = {
    user?: User
    loading: boolean
}

export interface SetUserAction extends Action {
    type: '@@user/SET_USER';
    payload: {
        user?: User
    };
}

export type UserActions = SetUserAction;