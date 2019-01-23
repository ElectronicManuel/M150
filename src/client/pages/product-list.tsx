/*
 * The ProductListPage component contains the product list page
 */

import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { push } from 'connected-react-router';
import { displayChfAmount, truncateText } from 'util/util';

class ProductListPageBase extends React.Component<ApplicationState & HasDispatch> {
    static contextType = APIContext

    render() {
        const productList = this.props.products.product_list.map(product => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={product.id}>
                <Card>
                    <CardActionArea onClick={() => this.props.dispatch(push(`/product/${product.id}`))}>
                        <CardMedia
                            style={{
                                objectFit: 'cover',
                                height: '30%'
                            }}
                            component='img'
                            image={product.imageUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='h2'>
                                {product.name}
                            </Typography>
                            <Typography variant='subtitle1' color='textSecondary'>
                                {displayChfAmount(product.price)}
                            </Typography>
                            <Typography component='p'>
                                {truncateText(product.description, 100)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size='small' color='primary' variant='contained' onClick={() => this.context.addProductToShoppingCart(product.id)}>
                            Kaufen
                        </Button>
                        <Button size='small' color='primary' onClick={() => this.props.dispatch(push(`/product/${product.id}`))}>
                            Details
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))
        return (
            <div>
                <LinearProgress style={{
                    width: this.props.products.loading ? undefined : '0'
                }} />
                <Typography variant='h3' style={{marginBottom: '1%'}}>Produkte</Typography>
                {
                    (this.props.products.product_list.length > 0 || this.props.products.loading) ?
                        <Grid container spacing={24}>
                            {productList}
                        </Grid>
                        :
                        <Typography variant='subtitle1'>
                            Keine Produkte verfügbar.
                        </Typography>
                }
            </div>
        )
    }
}

export const ProductListPage = connect(mapAppState, mapDispatch)(ProductListPageBase);