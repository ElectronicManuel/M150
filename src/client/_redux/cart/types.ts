import { Action } from 'redux';
import { ShoppingCart } from 'client/api';

export type CartState = {
    shopping_cart: ShoppingCart
    loading: boolean
}

export interface SetShoppingCartAction extends Action {
    type: '@@shopping_cart/SET_SHOPPING_CART';
    payload: {
        shopping_cart: ShoppingCart
    };
}

export interface SetShoppingCartLoadingAction extends Action {
    type: '@@shopping_cart/SET_LOADING';
    payload: {
        loading: boolean
    };
}



export type CartAction = SetShoppingCartAction | SetShoppingCartLoadingAction;