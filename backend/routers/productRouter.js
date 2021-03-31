import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

// api for sending list of product to frontend
productRouter.get('/', expressAsyncHandler(async(req, res) => {
    const name =req.query.name || '';
    const category =req.query.category || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i'} } : {};
    const categoryFilter = category ? { category } : {};
    const products = await Product.find({...nameFilter, ...categoryFilter });
    res.send(products);
}));

productRouter.get('/categories', expressAsyncHandler(async(req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}));

// api to create products based on data.products
productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
//  await Product.remove({});
 const createdProducts = await Product.insertMany(data.products);
 res.send({ createdProducts });
})); 

// define details Product api as last api
productRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    // using await findById return Promise and by using await its gonna be converted to real data and set to product
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product not Found'});
    }
}));

productRouter.post(
    '/:id/reviews',
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);;
        if (product) {
            if (product.reviews.find((x) => x.name === req.body.name)) {
                return res
                .status(400).send({ message: 'Olet jo lähettänyt arvostelun'});
            }
            const review = {
                name: req.body.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = 
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: "Arvostelu luotu",
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name' + Date.now(), 
        category: 'sample category',
        image: '/images/p1.jpg', 
        price: 0, 
        countInStock: 0, 
        brand: 'sample brand', 
        rating: 0,
        numReviews: 0, 
        description: 'sample description',  
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product created', product: createdProduct });
    })
);

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Tuote päivitetty', product: updatedProduct });
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Tuote poistettu', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

export default productRouter;