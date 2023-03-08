import mongoose from 'mongoose'

import Return from '../models/Return.js'
import ReturnService from '../services/ReturnService.js'

class ReturnController {
  async index(req, res){
    try {
      const processQuery = await ReturnService.processQuerySearch(req)
      if(!processQuery.status) throw { code: data.code, message: "ERROR_QUERY_SEARCH" }

      const returns = await Return.find(processQuery.query)
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
      const data = await ReturnService.processData(req)
      if (!data.status) throw { code: data.code, message: data.message }

      const newReturn = new Return(data.data)
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
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const returnTransaction = await Return.findOne({ _id: id })
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
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const returnTransaction = await Return.findByIdAndUpdate(
        { _id: id },
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
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const returnTransaction = await Return.findOneAndDelete({ _id: id })
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