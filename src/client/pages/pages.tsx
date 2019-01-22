import * as React from 'react';
import { Route, Switch } from 'react-router';
import { LoginPage } from './login';
import { ProductListPage } from './product-list';
import { ShoppingCartPage } from './shopping-cart';

export const Pages = (props) => (
    <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/shopping_cart' component={ShoppingCartPage} />
        <Route component={ProductListPage} />
    </Switch>
)