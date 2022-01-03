const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const mail = require('../middleware/mail');
const pseudo = require('../middleware/pseudo');
const auth = require('../middleware/auth');

router.post("/register", mail, pseudo, authController.signUp);

router.post("/signin", authController.login);

router.get('/:id', auth, userController.userInfo);

router.delete('/:id', auth, userController.deleteUser);

router.put('/:id', auth, userController.updateUser);

module.exports = router;