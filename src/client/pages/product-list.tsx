import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';

class ProductListPageBase extends React.Component<ApplicationState & HasDispatch> {
    render() {
        if(this.props.products.loading) {
            return <LinearProgress />
        }
        const productList = this.props.products.product_list.map(product => (
            <Card key={product.id} style={{
                width: '30%'
            }}>
                <CardActionArea>
                    <CardMedia
                        style={{
                            objectFit: 'cover',
                            height: '30%'
                        }}
                        component='img'
                        image={'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'}
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
                    <Button size='small' color='primary' variant='contained'>
                        In den Warenkorb
                    </Button>
                    <Button size='small' color='primary'>
                        Details
                    </Button>
                </CardActions>
            </Card>
        ))
        return (
            <div>
                <Typography variant='h3'>Produktee</Typography>
                {productList}
            </div>
        )
    }
}

export const ProductListPage = connect(mapAppState, mapDispatch)(ProductListPageBase);