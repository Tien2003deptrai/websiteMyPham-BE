const express = require('express');
const {
    getAllProducts,
    getOneProduct,
    createOneProduct,
    updateOneProduct,
    deleteOneProduct,
    getAllProductsBybrand,
    getAllProductsByRating
} = require('../Controllers/productControllers');
const router = express.Router();

router.get('/', getAllProducts);

router.get('/:productId', getOneProduct);

// router.post('/create', createOneProduct);

// router.put('/update/:productId', updateOneProduct);

// router.delete('/delete/:productId', deleteOneProduct);

router.get('/brand/:brand', getAllProductsBybrand);

router.get('/rating/:rating', getAllProductsByRating);


module.exports = router;