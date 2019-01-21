import { SetShoppingCartAction } from './types';
import { ShoppingCart } from 'client/api';

export const setShoppingCart: (shopping_cart: ShoppingCart) => SetShoppingCartAction = (shopping_cart) => {
    return {
        type: '@@shopping_cart/SET_SHOPPING_CART',
        payload: {
            shopping_cart
        }
    }
}