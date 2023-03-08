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

import auth from '../middlewares/auth.js'

const router = express.Router()

// storages
router.get('/storages', Storage.index)
router.get('/storages/:id', Storage.show)
router.post('/storages', auth(), Storage.store)
router.put('/storages/:id', auth(), Storage.update)
router.delete('/storages/:id', auth(), Storage.destroy)

// categories
router.get('/categories', Category.index)
router.get('/categories/:id', Category.show)
router.post('/categories', auth(), Category.store)
router.put('/categories/:id', auth(), Category.update)
router.delete('/categories/:id', auth(), Category.destroy)

// specializations
router.get('/specializations', Specialization.index)
router.get('/specializations/:id', Specialization.show)
router.post('/specializations', auth(), Specialization.store)
router.put('/specializations/:id', auth(), Specialization.update)
router.delete('/specializations/:id', auth(), Specialization.destroy)

// auth
router.post('/auth/login', Auth.login)
router.post('/auth/refresh-token', Auth.refreshToken)

// users
router.get('/users', auth(), User.index)
router.get('/users/:id', auth(), User.show)
router.post('/users', auth(), User.store)
router.post('/users/reset-password/:id', auth(), User.resetPassword)

// my-account
router.post('/my-account/change-password/:id', auth(), User.changePassword)
router.get('my-account', auth(), User.show)

// documents
router.get('/documents', Document.index)
router.get('/documents/:id', Document.show)
router.post('/documents', auth(), Document.store)
router.put('/documents/:id', auth(), Document.update)
router.delete('/documents/:id', auth(), Document.destroy)

// transactions
router.get('/transactions', auth(), Transaction.index)
router.get('/transactions/:id', auth(), Transaction.show)
router.post('/transactions', auth(), Transaction.store)
router.put('/transactions:id', auth(), Transaction.update)
router.delete('/transactions/:id', auth(), Transaction.destory)

// penalties
router.get('/penalties', auth(), Penalty.index)
router.get('/penalties/:id', auth(), Penalty.show)
router.post('/penalties', auth(), Penalty.store)
router.put('/penalties:id', auth(), Penalty.update)
router.delete('/penalties/:id', auth(), Penalty.destory)

// returns
router.get('/returns', auth(), Return.index)
router.get('/returns/:id', auth(), Return.show)
router.post('/returns', auth(), Return.store)
router.put('/returns:id', auth(), Return.update)
router.delete('/returns/:id', auth(), Return.destory)

export default router