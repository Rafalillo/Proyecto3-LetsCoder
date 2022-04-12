const reserveCtrl = require("../controllers/reserveCtrl")
const router = require('express').Router();
const auth = require("../middleware/auth");

router.route('/reserve')
    .post(auth, reserveCtrl.newReserve)

router.route('/reserve')
    .get(auth, reserveCtrl.getReserve)

    router.route('/reserve/:id')
    
    .delete(auth, reserveCtrl.deleteReserve)
    

module.exports = router