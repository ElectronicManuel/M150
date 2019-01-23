import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Theme, Button, Grid } from '@material-ui/core';
import { FlashOffRounded, FlashOnRounded, ShoppingCartRounded, HourglassFullRounded, RefreshRounded } from '@material-ui/icons';
import { ApplicationState, mapAppState, mapDispatch, HasDispatch } from './_redux';
import { connect } from 'react-redux';
import { Pages } from './pages/pages';
import { auth } from 'firebase';
import { push } from 'connected-react-router';
import { ShoppingCart } from './api';
import { APIContext } from './fetcher';

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

class LayoutBase extends React.Component<LayoutProps> {
    static contextType = APIContext

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%'
            }}>
                <div>
                    <AppBar position='relative' style={{zIndex: 999}}>
                        <Toolbar style={{ display: 'flex' }}>
                            <Typography variant='h6' color='inherit' noWrap onClick={() => this.props.dispatch(push('/'))} style={{cursor: 'pointer'}}>
                                Digimantec
                            </Typography>
                            <div style={{ flexGrow: 1 }} />
                            <div>
                                <IconButton onClick={() => {
                                    this.context.fetchProducts();
                                    this.context.fetchShoppingCart();
                                }} color='inherit'>
                                    <RefreshRounded />
                                </IconButton>
                                <IconButton onClick={this.props.changeTheme} color='inherit'>
                                    {
                                        this.props.theme.palette.type === 'dark' ? <FlashOffRounded /> : <FlashOnRounded />
                                    }
                                </IconButton>
                                {
                                    this.props.user.loading ?
                                        <IconButton color='inherit' disabled>
                                            <HourglassFullRounded color='secondary'/>
                                        </IconButton>
                                        :
                                        this.props.user.user ?
                                            <div style={{display: 'inline'}}>
                                                <IconButton color='inherit' onClick={() => this.props.dispatch(push('/shopping_cart'))}>
                                                    <Badge badgeContent={countShoppingCart(this.props.shopping_cart.shopping_cart)} color='secondary'>
                                                        <ShoppingCartRounded />
                                                    </Badge>
                                                </IconButton>
                                                <Button variant='contained' onClick={() => auth().signOut()} color='secondary' style={{marginLeft: '5px'}}>
                                                    Abmelden
                                                </Button>
                                            </div>
                                            :
                                            <Button variant='contained' onClick={() => this.props.dispatch(push('/login'))} color='secondary'>
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
                    <Grid container direction='row' justify='space-around' alignItems='stretch'>
                        <Grid item xs={12} sm={10} style={{
                            backgroundColor: this.props.theme.palette.background.default,
                            paddingLeft: '2%',
                            paddingRight: '2%',
                            paddingTop: '1%',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}>
                            <Pages />
                        </Grid>
                    </Grid>
                </div>
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
                <Button href='/docs' target='_blank'>
                        Dokumentation
                    </Button>
                    <Button onClick={() => {
                        auth().currentUser.getIdToken().then(token => {
                            console.log(token);
                            alert('Du findest deinen ID Token in der Konsole');
                        }).catch(err => {
                            alert('Du musst angemeldet sein um deinen ID Token zu sehen.');
                        })
                    }}>
                        IDToken anzeigen
                    </Button>
                </div>
            </div>
        )
    }
}

export const Layout = connect(mapAppState, mapDispatch)(LayoutBase);