const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    loginUserWithToken,
    loginUserGetData
} = require('../Controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/loginGet', loginUserGetData);
router.post('/loginWithToken', loginUserWithToken);

module.exports = router;
