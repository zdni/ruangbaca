import mongoose from 'mongoose'
import Return from '../models/Return.js'

class ReturnController {
  async index(req, res){
    try {
      const returns = await Return.find()
      if(!returns) { throw { code: 404, message: "RETURN_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_RETURN",
        returns
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
      if(!req.body.transactionId) { throw { code: 428, message: "Transaction is required" } }
      if(!req.body.date) { throw { code: 428, message: "Date is required" } }

      if(!mongoose.Types.ObjectId.isValid(req.params.transactionId)) { throw { code: 400, message: "INVALID_TRANSACTION_ID" } }
      
      const newReturn = new Return({
        transactionId: req.body.transactionId,
        date: req.body.date,
      })
      const returnTransaction = await newReturn.save()
      if(!returnTransaction) { throw { code: 404, message: "FAILED_CREATE_RETURN" } }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_RETURN",
        returnTransaction
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

      const returnTransaction = await Return.findOne({ _id: req.params.id })
      if(!returnTransaction) { throw { code: 404, message: "RETURN_NOT_FOUND" } }
      
      return res.status(200).json({
        status: true,
        message: "RETURN_FOUND",
        returnTransaction
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

      const returnTransaction = await Return.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      if(!returnTransaction) { throw { code: 500, message: "RETURN_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "RETURN_UPDATE_SUCCESS",
        returnTransaction
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async destory(req, res) {
    try {
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

      const returnTransaction = await Return.findOneAndDelete({ _id: req.params.id })
      if(!returnTransaction) { throw { code: 500, message: "RETURN_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "RETURN_DELETE_SUCCESS",
        returnTransaction
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

export default new ReturnController