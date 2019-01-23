import * as React from 'react';
import { Typography, LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { HasDispatch, ApplicationState, mapAppState, mapDispatch } from 'client/_redux';
import { APIContext } from 'client/fetcher';
import { RouteComponentProps } from 'react-router';

class ProductDetailPageBase extends React.Component<ApplicationState & HasDispatch & RouteComponentProps> {
    static contextType = APIContext

    render() {
        const productId: string = (this.props.match.params as any).productId
        const product = this.props.products.product_list.find(search => {
            return search.id === productId;
        });
        return (
            <div>
                <LinearProgress style={{
                    width: this.props.products.loading ? undefined : '0'
                }} />
                {
                    (!product && !this.props.products.loading) ?
                        <Typography>
                            Produkt nicht gefunden
                        </Typography>
                        :
                        !this.props.products.loading && <div>
                            <Typography variant='h3'>{product.name}</Typography>
                        </div>
                }
            </div>
        )
    }
}

export const ProductDetailPage = connect(mapAppState, mapDispatch)(ProductDetailPageBase);