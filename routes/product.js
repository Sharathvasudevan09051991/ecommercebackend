const express = require('express');
const router = express.Router();

const {createProduct,productId,  read, removeProduct, updateProduct, allProduct} = require('../controllers/product'); 

router.post('/create', createProduct)
router.get('/:productId', read)
router.get('/', allProduct)
router.delete('/:productId', removeProduct)
router.put('/:productId', updateProduct)


router.param("productId", productId)


module.exports = router