import { Reducer } from 'redux';
import { CartState, CartAction } from './types';

const defaultState: CartState = {
    shopping_cart: []
}

export const CartReducer: Reducer<CartState, CartAction> = (state = defaultState, action): CartState => {
    switch(action.type) {
        case '@@shopping_cart/SET_SHOPPING_CART':
            return {
                ...state,
                shopping_cart: action.payload.shopping_cart
            };
        default:
            return state;
    }
}