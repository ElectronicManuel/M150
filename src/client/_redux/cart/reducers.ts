/*
 * This file provides the reducer for the shopping cart redux state
 */

import { Reducer } from 'redux';
import { CartState, CartAction } from './types';

const defaultState: CartState = {
    shopping_cart: [],
    loading: true
}

export const CartReducer: Reducer<CartState, CartAction> = (state = defaultState, action): CartState => {
    switch(action.type) {
        case '@@shopping_cart/SET_SHOPPING_CART':
            return {
                ...state,
                shopping_cart: action.payload.shopping_cart
            };
        case '@@shopping_cart/SET_LOADING':
            return {
                ...state,
                loading: action.payload.loading
            };
        default:
            return state;
    }
}