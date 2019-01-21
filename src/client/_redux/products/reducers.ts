import { Reducer } from 'redux';
import { ProductsState, ProductActions } from './types';

const defaultState: ProductsState = {
    product_list: [],
    loading: true
}

export const ProductsReducer: Reducer<ProductsState, ProductActions> = (state = defaultState, action): ProductsState => {
    switch(action.type) {
        case '@@product/SET_PRODUCT_LIST':
            return {
                ...state,
                product_list: action.payload.product_list
            };
        case '@@product/SET_LOADING':
            return {
                ...state,
                loading: action.payload.loading
            }
        default:
            return state;
    }
}