import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { RouteComponentProps } from 'react-router';
import Lightbox from 'react-image-lightbox';

export type ProductDetailState = {
    lightboxOpen: boolean
}

class ProductDetailPageBase extends React.Component<ApplicationState & HasDispatch & RouteComponentProps, ProductDetailState> {
    static contextType = APIContext

    constructor(props) {
        super(props);

        this.state = {
            lightboxOpen: false
        }
    }

    render() {
        const productId: string = (this.props.match.params as any).productId
        const product = this.props.products.product_list.find(search => {
            return search.id === productId;
        });
        return (
            <div>
                {(product && this.state.lightboxOpen) && (
                    <Lightbox
                        mainSrc={product.imageUrl}
                        onCloseRequest={() => this.setState({ lightboxOpen: false })}
                    />
                )}
                <LinearProgress style={{
                    width: this.props.products.loading ? undefined : '0'
                }} />
                {
                    (!product && !this.props.products.loading) ?
                        <Typography>
                            Produkt nicht gefunden
                        </Typography>
                        :
                        product &&
                            <Grid container spacing={8} direction='column'>
                                <Grid item style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '60%'
                                }}>
                                    <img src={product.imageUrl} style={{
                                        objectFit: 'cover',
                                        maxHeight: '95%',
                                        maxWidth: '95%',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }} onClick={() => this.setState({ lightboxOpen: true })}></img>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={24}>
                                        <Grid item style={{flexGrow: 1}}>
                                            <Typography variant='h3'>{product.name}</Typography>
                                            <Typography variant='subtitle1' color='textSecondary'>CHF {product.price}</Typography>
                                            <Typography variant='body1'>{product.description}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant='contained' onClick={() => this.context.addProductToShoppingCart(product.id)}>
                                                Kaufen
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                }
            </div>
        )
    }
}

export const ProductDetailPage = connect(mapAppState, mapDispatch)(ProductDetailPageBase);