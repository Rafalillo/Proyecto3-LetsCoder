const lessonCtrl = require("../controllers/lessonCtrl")
const router = require('express').Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route('/lesson').get(auth, lessonCtrl.getLessons)

router.route('/newLesson').post(auth, authAdmin, lessonCtrl.createLesson)

router.route('/lesson/:id')
    .delete(auth, authAdmin, lessonCtrl.deleteLesson)
    .put(auth, authAdmin, lessonCtrl.updateLesson)

module.exports = router
