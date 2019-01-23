'use strict';

/*
 * This file contains the implemention for the api endpoints.
 */

import { ApiResult } from 'server/utils/writer';
import { ShoppingCart, ShoppingCartItem, Product, CheckoutConfirmation } from 'client/api';
import { admin } from 'server/db';
import { verifyIdToken } from 'server/utils/auth';
import { roundDigits } from 'util/util';


/**
 * Adds a product to the shopping cart
 *
 * id_token String 
 * productId String Product id that needs to be added to the cart
 * returns Product
 **/
export const addToShoppingCart: (id_token: string, productId: string) => Promise<ApiResult<Product>> = async (id_token, productId) => {
    try {
        const decodedToken = await verifyIdToken(id_token);

        const productSnap = await admin.firestore().collection('products').doc(productId).get();

        if(!productSnap.exists) {
            return {
                code: 404,
                error: {
                    message: `Produkt mit der ID ${productId} nicht gefunden`
                }
            }
        }

        const cartSnapshot = await admin.firestore().collection('shopping_carts').where('uid', '==', decodedToken.uid).get();

        let cart = {
            uid: decodedToken.uid,
            items: []
        }
        if(cartSnapshot.empty) {
            cart.items.push({
                amount: 1,
                product: {
                    id: productId
                }
            })
            await admin.firestore().collection('shopping_carts').add(cart);
        } else {
            let found = false;
            for(let item of cartSnapshot.docs[0].data().items) {
                if(item.product.id === productId) {
                    item.amount++;
                    found = true;
                }
                cart.items.push(item);
            }
            if(!found) {
                cart.items.push({
                    amount: 1,
                    product: {
                        id: productId
                    }
                })
            }
            await admin.firestore().collection('shopping_carts').doc(cartSnapshot.docs[0].id).update(cart);
        }

        return {
            code: 200,
            data: {
                ...productSnap.data(),
                id: productSnap.id
            }
        }
    } catch(err) {
        if(err.code) return err;
        return {
            code: 500,
            error: {
                message: `Fehler beim Hinzufügen des Produkts: ${JSON.stringify(err)}`
            }
        }
    }
}


/**
 * Checks a cart out
 *
 * id_token String 
 * returns CheckoutConfirmation
 **/
export const checkoutCart: (id_token: string) => Promise<ApiResult<CheckoutConfirmation>> = async (id_token) => {
    try {
        const decodedToken = await verifyIdToken(id_token);

        const cartSnapshot = await admin.firestore().collection('shopping_carts').where('uid', '==', decodedToken.uid).get();

        let total = 0;
        const products: Product[] = [];

        let cart = {
            uid: decodedToken.uid,
            items: []
        }
        if(cartSnapshot.empty) {
            await admin.firestore().collection('shopping_carts').add(cart);
        } else {
            for(let item of cartSnapshot.docs[0].data().items) {
                const productSnap = await admin.firestore().collection('products').doc(item.product.id).get();
                if(productSnap.exists) {
                    products.push({
                        ...productSnap.data(),
                        id: productSnap.id
                    });
                    total += item.amount * productSnap.data().price;
                    cart.items.push(item);
                }
            }
            await admin.firestore().collection('shopping_carts').doc(cartSnapshot.docs[0].id).update({
                uid: decodedToken.uid,
                items: []
            });
        }

        return {
            code: 200,
            data: {
                products,
                total: roundDigits(total, 2)
            }
        }
    } catch(err) {
        if(err.code) return err;
        return {
            code: 500,
            error: {
                message: `Fehler beim Auschecken des Einkaufswagens: ${JSON.stringify(err)}`
            }
        }
    }
}


/**
 * Deletes a product from the shopping cart
 *
 * id_token String 
 * productId String Product id to delete
 * returns Product
 **/
export const deleteProductFromCart: (id_token: string, productId: string) => Promise<ApiResult<Product>> = async (id_token, productId) => {
    try {
        const decodedToken = await verifyIdToken(id_token);

        const productSnap = await admin.firestore().collection('products').doc(productId).get();

        if(!productSnap.exists) {
            return {
                code: 404,
                error: {
                    message: `Produkt mit der ID ${productId} nicht gefunden`
                }
            }
        }

        const cartSnapshot = await admin.firestore().collection('shopping_carts').where('uid', '==', decodedToken.uid).get();

        let cart = {
            uid: decodedToken.uid,
            items: []
        }
        if(cartSnapshot.empty) {
            await admin.firestore().collection('shopping_carts').add(cart);
        } else {
            for(let item of cartSnapshot.docs[0].data().items) {
                if(item.product.id === productId) {
                    item.amount--;
                }
                if(item.amount >= 1) cart.items.push(item);
            }
            await admin.firestore().collection('shopping_carts').doc(cartSnapshot.docs[0].id).update(cart);
        }

        return {
            code: 200,
            data: {
                ...productSnap.data(),
                id: productSnap.id
            }
        }
    } catch(err) {
        if(err.code) return err;
        return {
            code: 500,
            error: {
                message: `Fehler beim Löschen des Produkts: ${JSON.stringify(err)}`
            }
        }
    }
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

