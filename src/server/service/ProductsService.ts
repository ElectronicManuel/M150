'use strict';


/**
 * Add a new product to the store
 *
 * id_token String 
 * body Product Product object that needs to be added to the store
 * returns Product
 **/
export const addProduct = function (id_token, body) {
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
export const deleteProduct = function (id_token, productId) {
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
export const getProductById = function (productId) {
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
 * List products
 *
 * returns List
 **/
export const listProducts = function () {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = [{
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
        }];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Updates a product in the store
 *
 * id_token String 
 * productId String ID of product that needs to be updated
 * body Product Product object that needs to be added to the store
 * returns Product
 **/
export const updateProduct = function (id_token, productId, body) {
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

