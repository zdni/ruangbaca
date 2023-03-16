import mongoose from 'mongoose'

import Penalty from '../models/Penalty.js'
import PenaltyService from '../services/PenaltyService.js'

class PenaltyController {
  async index(req, res){
    try {
      const processQuery = await PenaltyService.processQuerySearch(req)
      if(!processQuery.status) throw { code: data.code, message: "ERROR_QUERY_SEARCH" }
      
      const penalties = await Penalty.find(processQuery.query)
        .populate('transactionId')
        .populate('userId')
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
      const data = await PenaltyService.processData(req)
      if (!data.status) throw { code: data.code, message: data.message }
      
      const newPenalty = new Penalty(data.data)
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
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const penalty = await Penalty.findOne({ _id: id })
        .populate('transactionId')
        .populate('userId')
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
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const penalty = await Penalty.findByIdAndUpdate(
        { _id: id },
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

  async destroy(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const penalty = await Penalty.findOneAndDelete({ _id: id })
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