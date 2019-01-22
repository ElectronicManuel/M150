'use strict';

import { Product } from 'client/api';
import { ApiResult } from 'server/utils/writer';
import { admin } from 'server/db';


/**
 * Add a new product to the store
 *
 * id_token String 
 * body Product Product object that needs to be added to the store
 * returns Product
 **/
export const addProduct = (id_token, body) => {
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
 * Deletes a product
 *
 * id_token String 
 * productId String Product id to delete
 * returns Product
 **/
export const deleteProduct = (id_token, productId) => {
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
 * Find product by ID
 * Returns a single product
 *
 * productId String ID of product to return
 * returns Product
 **/
export const getProductById: (productId: string) => Promise<ApiResult<Product>> = async (productId) => {
    try {
        const snapshot = await admin.firestore().collection('products').doc(productId).get();
        if(!snapshot.exists) {
            return {
                code: 404,
                error: {
                    message: `Produkt mit der ID ${productId} nicht gefunden`
                }
            }
        }
        return {
            code: 200,
            data: {
                ...snapshot.data(),
                id: snapshot.id
            }
        };
    } catch(err) {
        return {
            code: 500,
            error: {
                message: `Fehler beim Anzeigen des Produkts: ${JSON.stringify(err)}`
            }
        }
    }
}


/**
 * List products
 *
 * returns List
 **/
export const listProducts: () => Promise<ApiResult<Product[]>> = async () => {
    try {
        const snapshot = await admin.firestore().collection('products').get();
        const productList: Product[] = [];
        snapshot.forEach(doc => {
            productList.push({
                ...doc.data(),
                id: doc.id
            });
        })
        return {
            code: 200,
            data: productList
        };
    } catch(err) {
        throw {
            code: 500,
            error: `Fehler beim Anzeigen der Produkte: ${JSON.stringify(err)}`
        }
    }
}


/**
 * Updates a product in the store
 *
 * id_token String 
 * productId String ID of product that needs to be updated
 * body Product Product object that needs to be added to the store
 * returns Product
 **/
export const updateProduct = (id_token, productId, body) => {
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

