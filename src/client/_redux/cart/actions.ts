/*
 * This file contains action generators related to the shopping cart
 */

import { SetShoppingCartAction, SetShoppingCartLoadingAction } from './types';
import { ShoppingCart } from 'client/api';

export const setShoppingCart: (shopping_cart: ShoppingCart) => SetShoppingCartAction = (shopping_cart) => {
    return {
        type: '@@shopping_cart/SET_SHOPPING_CART',
        payload: {
            shopping_cart
        }
    }
}

export const setShoppingCartLoading: (loading: boolean) => SetShoppingCartLoadingAction = (loading) => {
    return {
        type: '@@shopping_cart/SET_LOADING',
        payload: {
            loading
        }
    }
}