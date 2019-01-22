import * as React from 'react';
import { mapAppState, mapDispatch, ApplicationState, HasDispatch } from './_redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { setUser } from './_redux/users/actions';
import { ShoppingCartApi, ProductsApi } from './api';
import { setShoppingCart, setShoppingCartLoading } from './_redux/cart/actions';
import { setProductLoading, setProductList } from './_redux/products/actions';

class FetcherBase extends React.Component<ApplicationState & HasDispatch, any> {
    constructor(props) {
        super(props);

        firebase.auth().onAuthStateChanged(user => {
            this.props.dispatch(setUser(user));
        });

        new ShoppingCartApi().getShoppingCart('asdf').then(cart => {
            this.props.dispatch(setShoppingCart(cart));
            this.props.dispatch(setShoppingCartLoading(false));
        });
        new ProductsApi().listProducts().then(products => {
            this.props.dispatch(setProductList(products));
            this.props.dispatch(setProductLoading(false));
        });
    }

    render() {
        return this.props.children;
    }
}

export const Fetcher = connect(mapAppState, mapDispatch)(FetcherBase);