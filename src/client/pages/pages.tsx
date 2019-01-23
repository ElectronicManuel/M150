/*
 * The Pages component handles routing between all the pages in the app
 */

import * as React from 'react';
import { Route, Switch } from 'react-router';
import { LoginPage } from './login';
import { ProductListPage } from './product-list';
import { ShoppingCartPage } from './shopping-cart';
import { ProductDetailPage } from './product-detail';

export const Pages = (props) => (
    <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/shopping_cart' component={ShoppingCartPage} />
        <Route path='/product/:productId' component={ProductDetailPage} />
        <Route component={ProductListPage} />
    </Switch>
)