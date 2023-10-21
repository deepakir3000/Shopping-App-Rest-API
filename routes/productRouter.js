const productController = require('../controllers/productController')
const router = require('express').Router()
const auth = require("../authentication/tokenValidation")

router.post('/addProduct',auth.checkToken, productController.createProduct)
router.get('/allProducts',auth.checkToken, productController.getAllProducts)
router.get('/published',auth.checkToken, productController.getPublishedProduct)

router.get('/:id',auth.checkToken, productController.getOneProduct)
router.put('/:id',auth.checkToken, productController.updateProduct)
router.delete('/:id',auth.checkToken, productController.deleteProduct)
router.post("/login",productController.login)
router.post("/registration",productController.registration)

module.exports = router