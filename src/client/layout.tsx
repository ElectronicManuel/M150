import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Theme, Button } from '@material-ui/core';
import { FlashOffRounded, FlashOnRounded, ShoppingCartRounded, HourglassFullRounded } from '@material-ui/icons';
import { ApplicationState, mapAppState, mapDispatch, HasDispatch } from './_redux';
import { connect } from 'react-redux';
import { Pages } from './pages/pages';
import { auth } from 'firebase';
import { push } from 'connected-react-router';
import { ShoppingCart } from './api';

function countShoppingCart(shoppingCart: ShoppingCart) {
    let count = 0;
    for(let item of shoppingCart) {
        count += item.amount;
    }
    return count;
}

export type LayoutProps = {
    changeTheme: () => void
    theme: Theme
} & ApplicationState & HasDispatch

const LayoutBase = (props: LayoutProps) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    }}>
        <div>
            <AppBar position='relative'>
                <Toolbar style={{ display: 'flex' }}>
                    <Typography variant='h6' color='inherit' noWrap onClick={() => props.dispatch(push('/'))} style={{cursor: 'pointer'}}>
                        Digimantec
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <div>
                        <IconButton onClick={props.changeTheme} color='inherit'>
                            {
                                props.theme.palette.type === 'dark' ? <FlashOffRounded /> : <FlashOnRounded />
                            }
                        </IconButton>
                        {
                            props.user.loading ?
                                <IconButton color='inherit' disabled>
                                    <HourglassFullRounded color='secondary'/>
                                </IconButton>
                                :
                                props.user.user ?
                                    <div style={{display: 'inline'}}>
                                        <IconButton color='inherit' onClick={() => props.dispatch(push('/shopping_cart'))}>
                                            <Badge badgeContent={countShoppingCart(props.shopping_cart.shopping_cart)} color='secondary'>
                                                <ShoppingCartRounded />
                                            </Badge>
                                        </IconButton>
                                        <Button variant='contained' onClick={() => auth().signOut()} color='secondary' style={{marginLeft: '5px'}}>
                                            Abmelden
                                        </Button>
                                    </div>
                                    :
                                    <Button variant='contained' onClick={() => props.dispatch(push('/login'))} color='secondary'>
                                        Anmelden
                                    </Button>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        <div style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
            <div style={{
                width: '90%',
                backgroundColor: props.theme.palette.background.default,
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '1%'
            }}>
                <Pages />
            </div>
        </div>
        <div>
            <Button onClick={() => {
                auth().currentUser.getIdToken().then(token => {
                    console.log(token);
                    alert('Du findest deinen ID Token in der Konsole');
                }).catch(err => {
                    alert('Du musst angemeldet sein um deinen ID Token zu sehen.');
                })
            }}>
                Get ID Token
            </Button>
            <Button onClick={() => window.location.pathname='/docs'}>
                Docs
            </Button>
        </div>
    </div>
)

export const Layout = connect(mapAppState, mapDispatch)(LayoutBase);