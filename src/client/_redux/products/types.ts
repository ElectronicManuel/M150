/*
 * This file provides type definitions for the products redux state
 */

import { Action } from 'redux';
import { Product } from 'client/api';

export type ProductsState = {
    product_list: Product[]
    loading: boolean
}

export interface SetProductListAction extends Action {
    type: '@@product/SET_PRODUCT_LIST';
    payload: {
        product_list: Product[]
    };
}

export interface SetProductLoadingAction extends Action {
    type: '@@product/SET_LOADING';
    payload: {
        loading: boolean
    };
}

export type ProductActions = SetProductListAction | SetProductLoadingAction;