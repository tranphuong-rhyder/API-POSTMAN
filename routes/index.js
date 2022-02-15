const express = require('express');

const productRouter = require('./product');

const userRouter = require('./users');

function route(app) {

    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);
};
module.exports = route;