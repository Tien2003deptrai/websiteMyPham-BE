const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userModel = require('../Models/userModel');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const verifyToken = require('../middleware/authMiddleware');
const { getCheckout_Total } = require('../Controllers/checkoutController');
const { getAllProducts, createOneProduct, updateOneProduct, deleteOneProduct } = require('../Controllers/productControllers');

router.get('/profile', verifyToken, checkRoleMiddleware('admin'), (req, res) => {
    try {
        var checkTokenValid = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);

        userModel.findById({ _id: checkTokenValid._id })
            .then((response) => {
                return res.json({
                    message: 'access token admin',
                    _id: response._id,
                    name: response.name,
                    email: response.email,
                    role: response.role,
                    avatar: response.avatar
                });
            }).catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/* Cái này gửi cho máy chủ, thì máy chủ login rồi mới lấy được thì ỉa quá - 
có biện pháp 2 là tách riêng về (api/checkout) */

router.get('/checkoutTotal', checkRoleMiddleware('admin'), getCheckout_Total);

router.get('/checkout', checkRoleMiddleware('admin'), getAllProducts);

router.get('/products', checkRoleMiddleware('admin'), getAllProducts);

router.post('/products/create', checkRoleMiddleware('admin'), createOneProduct);

router.put('/products/update/:id', checkRoleMiddleware('admin'), updateOneProduct);

router.delete('/products/delete/:id', checkRoleMiddleware('admin'), deleteOneProduct);

module.exports = router;
