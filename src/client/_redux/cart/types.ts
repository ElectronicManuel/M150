import { Action } from 'redux';
import { ShoppingCart } from 'client/api';

export type CartState = {
    shopping_cart: ShoppingCart
}

export interface SetShoppingCartAction extends Action {
    type: '@@shopping_cart/SET_SHOPPING_CART';
    payload: {
        shopping_cart: ShoppingCart
    };
}


export type CartAction = SetShoppingCartAction;