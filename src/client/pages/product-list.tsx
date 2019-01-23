import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { push } from 'connected-react-router';

class ProductListPageBase extends React.Component<ApplicationState & HasDispatch> {
    static contextType = APIContext

    render() {
        const productList = this.props.products.product_list.map(product => (
            <Card key={product.id} style={{
                width: '30%'
            }}>
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
                            CHF {product.price}
                        </Typography>
                        <Typography component='p'>
                            {product.description}
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
        ))
        return (
            <div>
                <LinearProgress style={{
                    width: this.props.products.loading ? undefined : '0'
                }} />
                <Typography variant='h3'>Produkte</Typography>
                {productList}
            </div>
        )
    }
}

export const ProductListPage = connect(mapAppState, mapDispatch)(ProductListPageBase);