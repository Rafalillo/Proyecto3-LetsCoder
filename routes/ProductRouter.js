const productCtrl = require("../controllers/productCtrl");
const router = require('express').Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route('/products')
    .get( productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)

router.route('/products/:id')
    .get(auth, productCtrl.getOneProduct)
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)

module.exports = router
