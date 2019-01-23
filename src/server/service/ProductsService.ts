'use strict';

import { Product } from 'client/api';
import { ApiResult } from 'server/utils/writer';
import { admin } from 'server/db';
import { verifyIdToken } from 'server/utils/auth';


/**
 * Add a new product to the store
 *
 * id_token String 
 * body Product Product object that needs to be added to the store
 * returns Product
 **/
export const addProduct: (id_token: string, body: Product) => Promise<ApiResult<Product>> = async (id_token, input: Product) => {
    try {
        if(!input.name || !input.price || !input.description || !input.imageUrl) {
            return {
                code: 405,
                error: {
                    message: 'Ungültige Eingabe'
                }
            }
        }
        const decodedToken = await verifyIdToken(id_token);

        let newProduct: Product = {
            name: input.name,
            price: input.price,
            imageUrl: input.imageUrl,
            description: input.description
        }
        const doc = await admin.firestore().collection('products').add(newProduct);
        
        newProduct.id = doc.id;

        return {
            code: 200,
            data: newProduct
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
 * Deletes a product
 *
 * id_token String 
 * productId String Product id to delete
 * returns Product
 **/
export const deleteProduct: (id_token: string, productId: string) => Promise<ApiResult<Product>> = async (id_token, productId) => {
    try {
        const decodedToken = await verifyIdToken(id_token);

        const snap = await admin.firestore().collection('products').doc(productId).get();

        if(!snap.exists) {
            return {
                code: 404,
                error: {
                    message: `Produkt mit der ID ${productId} nicht gefunden`
                }
            }
        }

        const product = {
            ...snap.data(),
            id: snap.id
        }

        await admin.firestore().collection('products').doc(productId).delete();

        return {
            code: 200,
            data: product
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
export const updateProduct: (id_token: string, productId: string, input: Product) => Promise<ApiResult<Product>> = async (id_token, productId, input) => {
    try {
        const decodedToken = await verifyIdToken(id_token);

        const snap = await admin.firestore().collection('products').doc(productId).get();

        if(!snap.exists) {
            return {
                code: 404,
                error: {
                    message: `Produkt mit der ID ${productId} nicht gefunden`
                }
            }
        }

        let updatedProduct: Product = {
            ...snap.data(),
            ...input
        }

        await admin.firestore().collection('products').doc(productId).update(updatedProduct);

        return {
            code: 200,
            data: {
                ...updatedProduct,
                id: snap.id
            }
        }
    } catch(err) {
        if(err.code) return err;
        return {
            code: 500,
            error: {
                message: `Fehler beim Bearbeiten des Produkts: ${JSON.stringify(err)}`
            }
        }
    }
}

