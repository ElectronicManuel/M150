'use strict';


/**
 * Adds a product to the shopping cart
 *
 * id_token String 
 * productId String Product id that needs to be added to the cart
 * returns Product
 **/
export const addToShoppingCart = function (id_token, productId) {
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
export const checkoutCart = function (id_token) {
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
export const deleteProductFromCart = function (id_token, productId) {
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
export const getShoppingCart = function (id_token) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = "";
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

