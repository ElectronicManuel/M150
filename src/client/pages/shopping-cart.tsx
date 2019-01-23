import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { push } from 'connected-react-router';
import { displayChfAmount } from 'util/util';
import { RemoveRounded, AddRounded } from '@material-ui/icons';

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
                            title={cartItem.product.name}
                            style={{
                                width: '30%',
                                minWidth: '30%',
                                cursor: 'pointer'
                            }}
                            onClick={() => this.props.dispatch(push(`/product/${cartItem.product.id}`))}
                        />
                        <CardContent style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'stretch'}}>
                            <Typography component='h5' variant='h5' style={{textAlign: 'center'}}>
                                {cartItem.product.name}
                            </Typography>
                            <Typography variant='subtitle1' color='textSecondary' style={{textAlign: 'center'}}>
                                {displayChfAmount(cartItem.amount*cartItem.product.price)}
                            </Typography>
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <IconButton onClick={() => this.context.addProductToShoppingCart(cartItem.product.id)}>
                                    <AddRounded />
                                </IconButton>
                                <Typography variant='body1'>{cartItem.amount}</Typography>
                                <IconButton onClick={() => this.context.removeFromShoppingCart(cartItem.product.id)}>
                                    <RemoveRounded />
                                </IconButton>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            )
        });
        return (
            <div>
                <LinearProgress style={{
                    width: this.props.shopping_cart.loading ? undefined : '0'
                }} />
                <Typography variant='h3' style={{marginBottom: '2%'}}>Einkaufswagen</Typography>
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
                            <Grid item xl style={{flexGrow: 1}}>
                                <Grid container direction='column' spacing={8}>
                                    {cartList}
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Typography>Total: {displayChfAmount(total)}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

export const ShoppingCartPage = connect(mapAppState, mapDispatch)(ShoppingCartPageBase);