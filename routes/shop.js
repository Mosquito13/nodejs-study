const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/orders', isAuth, shopController.getOrders);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.addToCart);
router.post('/cart-delete-product', isAuth, shopController.postCartDeleteProduct);
router.post('/create-order', isAuth, shopController.postCreateOrder);

module.exports = router;
