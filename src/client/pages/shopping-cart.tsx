import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';

class ShoppingCartPageBase extends React.Component<ApplicationState & HasDispatch> {
    render() {
        if (this.props.shopping_cart.loading) {
            return <LinearProgress />
        }
        let total = 0;
        const cartList = this.props.shopping_cart.shopping_cart.map(cartItem => {
            total += cartItem.amount * cartItem.product.price;
            return (
                <Card key={cartItem.product.id} style={{
                    display: 'flex',
                    width: '40%'
                }}>
                    <CardMedia
                        image='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
                        title='Live from space album cover'
                        style={{
                            width: '30%'
                        }}
                    />
                    <div>
                        <CardContent>
                            <Typography component='h5' variant='h5'>
                                {cartItem.amount}x {cartItem.product.name}
                            </Typography>
                            <Typography variant='subtitle1' color='textSecondary'>
                                CHF {cartItem.amount*cartItem.product.price}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            )
        });
        return (
            <div>
                <Typography variant='h3'>Einkaufswagen</Typography>
                <div style={{
                    display: 'flex',
                    objectFit: 'cover'
                }}>
                    {cartList}
                    <Typography>Total: {total}</Typography>
                </div>
            </div>
        )
    }
}

export const ShoppingCartPage = connect(mapAppState, mapDispatch)(ShoppingCartPageBase);