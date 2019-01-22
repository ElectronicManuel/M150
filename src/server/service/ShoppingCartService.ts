'use strict';

import { ApiResult } from 'server/utils/writer';
import { ShoppingCart, ShoppingCartItem } from 'client/api';
import { admin } from 'server/db';
import { verifyIdToken } from 'server/utils/auth';


/**
 * Adds a product to the shopping cart
 *
 * id_token String 
 * productId String Product id that needs to be added to the cart
 * returns Product
 **/
export const addToShoppingCart = (id_token, productId) => {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "price": 0.80082819046101150206595775671303272247314453125,
            "imageUrl": "imageUrl",
            "name": "name",
            "description": "description",
            "id": "id"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Checks a cart out
 *
 * id_token String 
 * returns CheckoutConfirmation
 **/
export const checkoutCart = (id_token) => {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "total": 0.80082819046101150206595775671303272247314453125,
            "products": [{
                "price": 0.80082819046101150206595775671303272247314453125,
                "imageUrl": "imageUrl",
                "name": "name",
                "description": "description",
                "id": "id"
            }, {
                "price": 0.80082819046101150206595775671303272247314453125,
                "imageUrl": "imageUrl",
                "name": "name",
                "description": "description",
                "id": "id"
            }]
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Deletes a product from the shopping cart
 *
 * id_token String 
 * productId String Product id to delete
 * returns Product
 **/
export const deleteProductFromCart = (id_token, productId) => {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "price": 0.80082819046101150206595775671303272247314453125,
            "imageUrl": "imageUrl",
            "name": "name",
            "description": "description",
            "id": "id"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Get shopping cart for user
 * Returns the shopping cart of a user
 *
 * id_token String 
 * returns ShoppingCart
 **/
export const getShoppingCart: (id_token: string) => Promise<ApiResult<ShoppingCart>> = async (id_token) => {
    try {
        const decodedToken = await verifyIdToken(id_token);

        const cartSnap = await admin.firestore().collection('shopping_carts').where('uid', '==', decodedToken.uid).get();
        let cart: ShoppingCart = [];
        if(!cartSnap.empty) {
            for(let item of cartSnap.docs[0].data().items as ShoppingCartItem[]) {
                const snap = await admin.firestore().collection('products').doc(item.product.id).get();
                cart.push({
                    amount: item.amount,
                    product: {
                        ...snap.data(),
                        id: item.product.id
                    }
                });
            }
        } else {
            await admin.firestore().collection('shopping_carts').add({
                uid: decodedToken.uid,
                items: []
            });
        }

        return {
            code: 200,
            data: cart
        }
    } catch(err) {
        if(err.code) return err;
        return {
            code: 500,
            error: {
                message: `Ein Fehler ist aufgetreten: ${JSON.stringify(err)}`
            }
        }
    }
}

