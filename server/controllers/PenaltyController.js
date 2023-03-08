import mongoose from 'mongoose'
import Penalty from '../models/Penalty.js'

class PenaltyController {
  async index(req, res){
    try {
      const penalties = await Penalty.find()
      if(!penalties) { throw { code: 404, message: "PENALTY_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_PENALTY",
        penalties
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
      if(!req.body.penalty) { throw { code: 428, message: "Penalty is required" } }

      if(!mongoose.Types.ObjectId.isValid(req.params.transactionId)) { throw { code: 400, message: "INVALID_TRANSACTION_ID" } }
      
      const newPenalty = new Penalty({
        transactionId: req.body.transactionId,
        penalty: req.body.penalty,
      })
      const penalty = await newPenalty.save()
      if(!penalty) { throw { code: 404, message: "FAILED_CREATE_PENALTY" } }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_PENALTY",
        penalty
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

      const penalty = await Penalty.findOne({ _id: req.params.id })
      if(!penalty) { throw { code: 404, message: "PENALTY_NOT_FOUND" } }
      
      return res.status(200).json({
        status: true,
        message: "PENALTY_FOUND",
        penalty
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

      const penalty = await Penalty.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      if(!penalty) { throw { code: 500, message: "PENALTY_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "PENALTY_UPDATE_SUCCESS",
        penalty
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

      const penalty = await Penalty.findOneAndDelete({ _id: req.params.id })
      if(!penalty) { throw { code: 500, message: "PENALTY_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "PENALTY_DELETE_SUCCESS",
        penalty
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

export default new PenaltyController