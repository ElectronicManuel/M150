'use strict';

import * as utils from '../utils/writer';
import * as Products from '../service/ProductsService';

export const addProduct = function addProduct(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    var body = req.swagger.params['body'].value;
    Products.addProduct(id_token, body)
        .then(function (response) {
            utils.handleResponse(res, response);
        })
        .catch(function (response) {
            utils.handleResponse(res, response);
        });
};

export const deleteProduct = function deleteProduct(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    var productId = req.swagger.params['productId'].value;
    Products.deleteProduct(id_token, productId)
        .then(function (response) {
            utils.handleResponse(res, response);
        })
        .catch(function (response) {
            utils.handleResponse(res, response);
        });
};

export const getProductById = function getProductById(req, res, next) {
    var productId = req.swagger.params['productId'].value;
    Products.getProductById(productId)
        .then(function (response) {
            utils.handleResponse(res, response);
        })
        .catch(function (response) {
            utils.handleResponse(res, response);
        });
};

export const listProducts = function listProducts(req, res, next) {
    Products.listProducts()
        .then(function (response) {
            utils.handleResponse(res, response);
        })
        .catch(function (response) {
            utils.handleResponse(res, response);
        });
};

export const updateProduct = function updateProduct(req, res, next) {
    var id_token = req.swagger.params['id_token'].value;
    var productId = req.swagger.params['productId'].value;
    var body = req.swagger.params['body'].value;
    Products.updateProduct(id_token, productId, body)
        .then(function (response) {
            utils.handleResponse(res, response);
        })
        .catch(function (response) {
            utils.handleResponse(res, response);
        });
};
