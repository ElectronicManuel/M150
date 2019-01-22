import * as React from 'react';
import { Route, Switch } from 'react-router';
import { LoginPage } from './login';
import { ProductListPage } from './product-list';

export const Pages = (props) => (
    <Switch>
        <Route path='/login' component={LoginPage} />
        <Route component={ProductListPage} />
    </Switch>
)