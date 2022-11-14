import express from 'express';
import productsController from '../controller/products.js';

const routerProducts = express.Router();
routerProducts.get('/', productsController.getProducts);
routerProducts.get('/:id', productsController.getProduct);
routerProducts.post('/new', productsController.postProduct);
routerProducts.post('/cart', (req,res) => {
    console.log(req.body);
});
routerProducts.put('/:id', productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

export default routerProducts;
