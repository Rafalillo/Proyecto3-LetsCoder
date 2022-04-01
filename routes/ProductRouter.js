const productCtrl = require("../controllers/productCtrl");
const router = require('express').Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route('/products')
    .get(auth, productCtrl.getProducts)
    .post(auth,  productCtrl.createProduct)

router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)

module.exports = router
