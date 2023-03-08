import express from 'express'

import Auth from '../controllers/AuthController.js'
import Category from '../controllers/CategoryController.js'
import Document from '../controllers/DocumentController.js'
import Penalty from '../controllers/PenaltyController.js'
import Return from '../controllers/ReturnController.js'
import Specialization from '../controllers/SpecializationController.js'
import Storage from '../controllers/StorageController.js'
import Transaction from '../controllers/TransactionController.js'
import User from '../controllers/UserController.js'

const router = express.Router()

// storages
router.get('/storages', Storage.index)
router.get('/storages/:id', Storage.show)
router.post('/storages', Storage.store)
router.put('/storages/:id', Storage.update)
router.delete('/storages/:id', Storage.destroy)

// categories
router.get('/categories', Category.index)
router.get('/categories/:id', Category.show)
router.post('/categories', Category.store)
router.put('/categories/:id', Category.update)
router.delete('/categories/:id', Category.destroy)

// specializations
router.get('/specializations', Specialization.index)
router.get('/specializations/:id', Specialization.show)
router.post('/specializations', Specialization.store)
router.put('/specializations/:id', Specialization.update)
router.delete('/specializations/:id', Specialization.destroy)

// auth
router.post('/auth/login', Auth.login)
router.get('/auth/logout')
router.post('/auth/refresh-token', Auth.refreshToken)

// users
router.get('/users', User.index)
router.get('/users/:id', User.show)
router.post('/users', User.store)
router.post('/users/reset-password/:id', User.resetPassword)

// my-account
router.post('/my-account/change-password/:id', User.changePassword)
router.get('my-account', User.show)

// documents
router.get('/documents', Document.index)
router.get('/documents/:id', Document.show)
router.post('/documents', Document.store)
router.put('/documents/:id', Document.update)
router.delete('/documents/:id', Document.destroy)

// transactions
router.get('/transactions', Transaction.index)
router.get('/transactions/:id', Transaction.show)
router.post('/transactions', Transaction.store)
router.put('/transactions:id', Transaction.update)
router.delete('/transactions/:id', Transaction.destory)

// penalties
router.get('/penalties', Penalty.index)
router.get('/penalties/:id', Penalty.show)
router.post('/penalties', Penalty.store)
router.put('/penalties:id', Penalty.update)
router.delete('/penalties/:id', Penalty.destory)

// returns
router.get('/returns', Return.index)
router.get('/returns/:id', Return.show)
router.post('/returns', Return.store)
router.put('/returns:id', Return.update)
router.delete('/returns/:id', Return.destory)

export default router