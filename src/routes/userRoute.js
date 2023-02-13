const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/otp', userController.sendOtp);
router.post('/login', userController.loginUser);

module.exports = router;