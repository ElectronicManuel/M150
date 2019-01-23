import * as React from 'react';
import { mapAppState, mapDispatch, ApplicationState, HasDispatch } from './_redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase/app';
import { setUser } from './_redux/users/actions';
import { ShoppingCartApi, ProductsApi, CheckoutConfirmation } from './api';
import { setShoppingCart, setShoppingCartLoading } from './_redux/cart/actions';
import { setProductLoading, setProductList } from './_redux/products/actions';

export interface APIContextInterface {
    fetchProducts: () => any
    fetchShoppingCart: () => any
    addProductToShoppingCart: (productId: string) => any
    removeFromShoppingCart: (productId: string) => any
    checkout: () => Promise<CheckoutConfirmation | null>
}

export const APIContext = React.createContext<APIContextInterface>({
    fetchProducts: () => {},
    fetchShoppingCart: () => {},
    addProductToShoppingCart: (productId: string) => {},
    removeFromShoppingCart: (productId: string) => {},
    checkout: async () => {return null}
})

class FetcherBase extends React.Component<ApplicationState & HasDispatch, any> {

    shoppingCartApi = new ShoppingCartApi()
    productsApi = new ProductsApi()

    constructor(props) {
        super(props);

        firebase.auth().onAuthStateChanged(user => {
            this.props.dispatch(setUser(user));
            if(user) {
                user.getIdToken().then(idToken => {
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

    fetchProducts = async () => {
        this.props.dispatch(setProductLoading(true));
        try {
            const products = await this.productsApi.listProducts();
            this.props.dispatch(setProductList(products));
        } catch(err) {
        }
        this.props.dispatch(setProductLoading(false));
    }

    fetchShoppingCart = async () => {
        this.props.dispatch(setShoppingCartLoading(true));
        try {
            const token = await firebase.auth().currentUser.getIdToken();

            const cart = await this.shoppingCartApi.getShoppingCart(token);
            this.props.dispatch(setShoppingCart(cart));
        } catch(err) {
        }
        this.props.dispatch(setShoppingCartLoading(false));
    }

    addProductToShoppingCart = async (productId: string) => {
        try {
            const token = await firebase.auth().currentUser.getIdToken();
            await this.shoppingCartApi.addToShoppingCart(token, productId);
            this.fetchShoppingCart();
            this.fetchProducts();
        } catch(err) {
            alert('Bitte melde dich an um dieses Produkt zu kaufen');
        }
    }

    removeFromShoppingCart = async (productId: string) => {
        try {
            const token = await firebase.auth().currentUser.getIdToken();
            await this.shoppingCartApi.deleteProductFromCart(token, productId);
            this.fetchShoppingCart();
            this.fetchProducts();
        } catch(err) {
        }
    }

    checkout = async () => {
        this.props.dispatch(setShoppingCartLoading(true));
        try {
            const token = await firebase.auth().currentUser.getIdToken();
            const confirmation = await this.shoppingCartApi.checkoutCart(token);
            await this.fetchShoppingCart();
            this.props.dispatch(setShoppingCartLoading(false));
            return confirmation;
        } catch(err) {
            this.props.dispatch(setShoppingCartLoading(false));
            return null;
        }
    }

    render() {
        return (
            <APIContext.Provider value={{
                fetchProducts: this.fetchProducts,
                fetchShoppingCart: this.fetchShoppingCart,
                addProductToShoppingCart: this.addProductToShoppingCart,
                removeFromShoppingCart: this.removeFromShoppingCart,
                checkout: this.checkout
            }}>
                {this.props.children}
            </APIContext.Provider>
        );
    }
}

export const Fetcher = connect(mapAppState, mapDispatch)(FetcherBase);