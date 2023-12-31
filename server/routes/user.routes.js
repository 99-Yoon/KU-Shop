import express from "express";
import userCtrl from '../controllers/user.controller.js';

const router = express.Router()

router.route('/signup')
    .post(userCtrl.signup)

router.route('/account/:userId')
    .get(userCtrl.username)
    .put(userCtrl.imgUpload, userCtrl.update)

router.route('/addorder')
    .post(userCtrl.addorder)

router.param('userId', userCtrl.userById)

export default router