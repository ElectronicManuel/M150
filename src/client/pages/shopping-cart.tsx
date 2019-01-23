import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';

class ShoppingCartPageBase extends React.Component<ApplicationState & HasDispatch> {
    static contextType = APIContext

    render() {
        let total = 0;
        const cartList = this.props.shopping_cart.shopping_cart.map(cartItem => {
            total += cartItem.amount * cartItem.product.price;
            return (
                <Card key={cartItem.product.id} style={{
                    display: 'flex',
                    width: '40%'
                }}>
                    <CardMedia
                        image={cartItem.product.imageUrl}
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
                            <Button onClick={() => this.context.addProductToShoppingCart(cartItem.product.id)}>
                                Mehr
                            </Button>
                            <Button onClick={() => this.context.removeFromShoppingCart(cartItem.product.id)}>
                                Weniger
                            </Button>
                        </CardContent>
                    </div>
                </Card>
            )
        });
        return (
            <div>
                <LinearProgress style={{
                    width: this.props.shopping_cart.loading ? undefined : '0'
                }} />
                <Typography variant='h3'>Einkaufswagen</Typography>
                {
                    !this.props.user.user ?
                    <Typography>
                        Du musst angemeldet sein um deinen Einkaufswagen einzusehen.
                    </Typography>
                    :
                    <div style={{
                        display: 'flex',
                    }}>
                        {cartList}
                        <Typography>Total: {total}</Typography>
                    </div>
                }
            </div>
        )
    }
}

export const ShoppingCartPage = connect(mapAppState, mapDispatch)(ShoppingCartPageBase);