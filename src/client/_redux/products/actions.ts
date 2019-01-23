/*
 * This file contains action generators related to products
 */

import { SetProductListAction, SetProductLoadingAction } from './types';
import { Product } from 'client/api';

export const setProductList: (product_list: Product[]) => SetProductListAction = (product_list) => {
    return {
        type: '@@product/SET_PRODUCT_LIST',
        payload: {
            product_list
        }
    }
}

export const setProductLoading: (loading: boolean) => SetProductLoadingAction = (loading) => {
    return {
        type: '@@product/SET_LOADING',
        payload: {
            loading
        }
    }
}