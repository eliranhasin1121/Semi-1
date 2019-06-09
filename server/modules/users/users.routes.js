const users = require('express').Router()
const usersController = require('./users.controller')
const authMiddleware = require('../../middleware/authMiddleware')
const adminMiddleware = require('../../middleware/adminMiddleware')

users.get('/', authMiddleware, adminMiddleware, usersController.getAllUsers)
users.get('/active-user', usersController.fetchActiveUser)
users.get('/products/:username', usersController.getProducts)
users.get('/matching/:username', usersController.getMatchingIfExist)
users.get('/orders', usersController.getOrdersByUsername)
users.get('/replacement/:username', usersController.getReplacementProductsByUsername)
users.get('/:username', usersController.getUserByUsername)
users.get('/userdata/:username', usersController.getRestrictedUserData)
users.get('/products-to-replace/:userId', usersController.getAllProductsToReplace)
users.post('/product', authMiddleware, usersController.addProductToUser)
users.put('/product', authMiddleware, usersController.updateProductToUser)
users.post('/rent', authMiddleware, usersController.rentProduct)
users.post('/match', authMiddleware, usersController.manageMatching)
users.delete('/:userId', authMiddleware, adminMiddleware, usersController.deleteUserById)
module.exports = users
