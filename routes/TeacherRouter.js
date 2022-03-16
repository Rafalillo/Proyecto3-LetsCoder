const teacherCtrl = require('../controllers/teacherCtrl');
const authAdmin = require('../middleware/authAdmin');
const router = require('express').Router();
const auth = require('../middleware/auth');


router.route('/teacher')
    .get(auth, teacherCtrl.getTeacher)
    .post(auth, authAdmin, teacherCtrl.newTeacher)

router.route('/teacher/:id')
    .put(auth, authAdmin, teacherCtrl.updateTeacher)
    .delete(auth, authAdmin, teacherCtrl.deleteTeacher)

module.exports = router