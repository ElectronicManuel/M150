import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { push } from 'connected-react-router';
import { displayChfAmount } from 'util/util';
import { RemoveRounded, AddRounded } from '@material-ui/icons';
import { CheckoutConfirmation } from 'client/api';

class ShoppingCartPageBase extends React.Component<ApplicationState & HasDispatch> {
    static contextType = APIContext

    checkout = async () => {
        const confirmation: CheckoutConfirmation | null = await this.context.checkout();
        if(!confirmation) {
            alert('Es ist ein Fehler aufgetreten');
        }

        alert(`Bestellung von ${displayChfAmount(confirmation.total)} versandt.`);
    }

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
                            {
                                this.props.shopping_cart.shopping_cart.length > 0 ?
                                    <Grid item xl style={{flexGrow: 1}}>
                                        <Grid container direction='column' spacing={8}>
                                            {cartList}
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid item xl style={{flexGrow: 1}}>
                                        <Typography variant='subtitle1'>
                                            Du hast keine Produkte in deinem Einkaufswagen.
                                        </Typography>
                                    </Grid>
                            }
                            
                            <Grid item xs style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <div>
                                    <Typography variant='subtitle1'>Total: <b>{displayChfAmount(total)}</b></Typography>
                                    <Button disabled={this.props.shopping_cart.shopping_cart.length <= 0} variant='contained' color='primary' style={{float: 'right'}} onClick={this.checkout}>
                                        Bestellen
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

export const ShoppingCartPage = connect(mapAppState, mapDispatch)(ShoppingCartPageBase);