const Product = require('../models/Product');

class ProductController {

    //[POST] api/products/new
    async createNewProduct(req, res, next) {
        const product = req.body;
        const newProduct = await Product.create(product);

        res.status(201).json({
            success: true,
            newProduct,
        });
    }

    // [GET] api/products/
    async getAllProduct(req, res, next) {
        const products = await Product.find();
        const productCount = await Product.countDocuments();
        if (!products) {
            res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        };

        res.status(200).json({
            success: true,
            productCount,
            products,
        })

    }

    //[GET] api/products/:id

    //[PUT] api/products/:id
    async updateProduct(req, res, next) {

        let product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        };

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            message: "Product update successfull!",
            product,
        });

    }

}
module.exports = new ProductController;