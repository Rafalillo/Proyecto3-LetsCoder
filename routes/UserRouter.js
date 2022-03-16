const userCtrl = require('../controllers/userCtrl');
const router = require('express').Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/user')
    .get(auth, userCtrl.getUsers)

router.route('/register')
    .post(userCtrl.createUser)
 
router.route('/user/:id')
    .get(auth, authAdmin, userCtrl.getOneUser)
    .put(auth, userCtrl.updateUser)
    .delete(auth, userCtrl.deleteUser)
    
router.route('/login')
    .post(userCtrl.login)


router.route('/addCart')
    .patch(auth, userCtrl.addCart)

module.exports = router