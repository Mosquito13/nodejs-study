const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/products', isAuth, adminController.getProducts);
router.get('/add-product', isAuth, adminController.getAddProduct);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.post(
  '/add-product',
  [
    body('title', 'Invalid title')
      .trim()
      .isLength({ min: 3 })
      .isString(),
    body('imageUrl', 'Invalid image URL')
      .trim()
      .isURL(),
    body('price', 'Invalid price')
      .isFloat(),
    body('description', 'Invalid description')
      .trim()
      .isLength({ min: 5, max: 200 })
  ],
  isAuth,
  adminController.postAddProduct
);

router.post(
  '/edit-product',
  [
    body('title', 'Invalid title')
      .trim()
      .isLength({ min: 3 })
      .isString(),
    body('imageUrl', 'Invalid image URL')
      .trim()
      .isURL(),
    body('price', 'Invalid price')
      .isFloat(),
    body('description', 'Invalid description')
      .trim()
      .isLength({ min: 5, max: 200 })
  ],
  isAuth,
  adminController.postEditProduct
);

module.exports = router;
