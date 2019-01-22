'use strict';

import * as utils from '../utils/writer';
import * as ShoppingCart from '../service/ShoppingCartService';

module.exports.addToShoppingCart = function addToShoppingCart(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    var productId = req.swagger.params['productId'].value;
    ShoppingCart.addToShoppingCart(id_token, productId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.checkoutCart = function checkoutCart(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    ShoppingCart.checkoutCart(id_token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteProductFromCart = function deleteProductFromCart(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    var productId = req.swagger.params['productId'].value;
    ShoppingCart.deleteProductFromCart(id_token, productId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getShoppingCart = function getShoppingCart(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    ShoppingCart.getShoppingCart(id_token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
