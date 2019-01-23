import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { push } from 'connected-react-router';

class ShoppingCartPageBase extends React.Component<ApplicationState & HasDispatch> {
    static contextType = APIContext

    render() {
        let total = 0;
        const cartList = this.props.shopping_cart.shopping_cart.map(cartItem => {
            total += cartItem.amount * cartItem.product.price;
            return (
                <Grid item xs key={cartItem.product.id}>
                    <Card style={{
                        display: 'flex'
                    }}>
                        <CardMedia
                            image={cartItem.product.imageUrl}
                            title='Live from space album cover'
                            style={{
                                width: '30%',
                                cursor: 'pointer'
                            }}
                            onClick={() => this.props.dispatch(push(`/product/${cartItem.product.id}`))}
                        />
                        <div>
                            <CardContent>
                                <Typography component='h5' variant='h5'>
                                    {cartItem.amount}x {cartItem.product.name}
                                </Typography>
                                <Typography variant='subtitle1' color='textSecondary'>
                                    CHF {cartItem.amount*cartItem.product.price}
                                </Typography>
                                <Button onClick={() => this.context.addProductToShoppingCart(cartItem.product.id)}>
                                    Mehr
                                </Button>
                                <Button onClick={() => this.context.removeFromShoppingCart(cartItem.product.id)}>
                                    Weniger
                                </Button>
                            </CardContent>
                        </div>
                    </Card>
                </Grid>
            )
        });
        return (
            <div>
                <LinearProgress style={{
                    width: this.props.shopping_cart.loading ? undefined : '0'
                }} />
                <Typography variant='h3'>Einkaufswagen</Typography>
                {
                    !this.props.user.user && !this.props.user.loading ?
                    <Typography>
                        Du musst angemeldet sein um deinen Einkaufswagen einzusehen.
                    </Typography>
                    :
                    <div style={{
                        display: 'flex',
                    }}>
                        <Grid container spacing={24}>
                            <Grid item style={{flexGrow: 1}}>
                                <Grid container direction='column' spacing={8}>
                                    {cartList}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography>Total: {total}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

export const ShoppingCartPage = connect(mapAppState, mapDispatch)(ShoppingCartPageBase);