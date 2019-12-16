const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
// router.get('/orders', shopController.getOrders);
// router.get('/checkout', shopController.getCheckout);
// router.get('/cart', shopController.getCart);
// router.post('/cart', shopController.addToCart);
// router.post('/cart-delete-product', shopController.postCartDeleteProduct);
// router.post('/create-order', shopController.postCreateOrder);

module.exports = router;
