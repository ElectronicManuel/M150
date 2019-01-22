import * as React from 'react';
import { mapAppState, mapDispatch, ApplicationState, HasDispatch } from './_redux';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import { setUser } from './_redux/users/actions';
import { ShoppingCartApi, ProductsApi } from './api';
import { setShoppingCart, setShoppingCartLoading } from './_redux/cart/actions';
import { setProductLoading, setProductList } from './_redux/products/actions';

class FetcherBase extends React.Component<ApplicationState & HasDispatch, any> {

    shoppingCartApi = new ShoppingCartApi()
    productsApi = new ProductsApi()

    constructor(props) {
        super(props);

        auth().onAuthStateChanged(user => {
            this.props.dispatch(setUser(user));
            if(user) {
                user.getIdToken().then(idToken => {
                    console.debug('IdToken: ', idToken);
                    this.shoppingCartApi.getShoppingCart(idToken).then(cart => {
                        this.props.dispatch(setShoppingCart(cart));
                        this.props.dispatch(setShoppingCartLoading(false));
                    });
                })
            } else {
                this.props.dispatch(setShoppingCart([]));
                this.props.dispatch(setShoppingCartLoading(false));
            }
        });

        this.productsApi.listProducts().then(products => {
            this.props.dispatch(setProductList(products));
            this.props.dispatch(setProductLoading(false));
        });
    }

    render() {
        return this.props.children;
    }
}

export const Fetcher = connect(mapAppState, mapDispatch)(FetcherBase);