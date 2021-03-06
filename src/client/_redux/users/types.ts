/*
 * This file provides type definitions for the user redux state
 */

import { Action } from 'redux';
import { User } from 'firebase/auth';

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