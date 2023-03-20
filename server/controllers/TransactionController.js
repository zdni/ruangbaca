import mongoose from 'mongoose'
import Transaction from '../models/Transaction.js'
import TransactionService from '../services/TransactionService.js'

class TransactionController {
  async index(req, res){
    try {
      const processQuery = await TransactionService.processQuerySearch(req)
      if(!processQuery.status) throw { code: data.code, message: "ERROR_QUERY_SEARCH" }
      
      const transactions = await Transaction.find(processQuery.query)
        .populate('userId')
        .populate('documentId')
      if(!transactions) { throw { code: 404, message: "TRANSACTION_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_TRANSACTION",
        transactions
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async store(req, res) {
    try {
      const data = await TransactionService.processData(req)
      if (!data.status) throw { code: data.code, message: data.message }
      
      const newTransaction = new Transaction(data.data)
      const transaction = await newTransaction.save()
      if(!transaction) { throw { code: 404, message: "FAILED_CREATE_TRANSACTION" } }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_TRANSACTION",
        transaction
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async show(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const transaction = await Transaction.findOne({ _id: id })
        .populate('userId')
        .populate('documentId')
      if(!transaction) { throw { code: 404, message: "TRANSACTION_NOT_FOUND" } }
      
      return res.status(200).json({
        status: true,
        message: "TRANSACTION_FOUND",
        transaction
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async update(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const transaction = await Transaction.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      )
      if(!transaction) { throw { code: 500, message: "TRANSACTION_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "TRANSACTION_UPDATE_SUCCESS",
        transaction
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async destroy(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const transaction = await Transaction.findOneAndDelete({ _id: id })
      if(!transaction) { throw { code: 500, message: "TRANSACTION_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "TRANSACTION_DELETE_SUCCESS",
        transaction
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }
}

export default new TransactionController