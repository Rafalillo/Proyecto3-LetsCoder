const reserveCtrl = require("../controllers/reserveCtrl")
const router = require('express').Router();
const auth = require("../middleware/auth");

router.route('/reserve')
    .post(auth, reserveCtrl.newReserve)

    router.route('/reserve/:id')
    .get(auth, reserveCtrl.getReserve)
    .delete(auth, reserveCtrl.deleteReserve)
    

module.exports = router