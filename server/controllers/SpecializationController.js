import mongoose from 'mongoose'
import Specialization from '../models/Specialization.js'

class SpecializationController {
  async index(req, res) {
    try {
      const specializations = await Specialization.find()
      if( !specializations ) { throw { code: 404, message: "SPECIALIZATION_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_SPECIALIZATION",
        specializations
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      })
    }
  }

  async store(req, res) {
    try {
      const {name} = req.body
      if(!name) { throw { code: 428, message: "Name Book is required" } }
      
      const newSpecialization = new Specialization({
        name: name
      })
      const specialization = await newSpecialization.save()
      if( !specialization ) { throw { code: 500, message: "FAILED_CREATE_SPECIALIZATION" } }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_SPECIALIZATION",
        specialization
      })
    } catch (err) {
      return res.status( err.code || 500 ).json({
        status: false,
        message: err.message,
      })
    }
  }

  async show(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const specialization = await Specialization.findOne({ _id: id })
      if(!specialization) { throw { code: 404, message: "SPECIALIZATION_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "SPECIALIZATION_FOUND",
        specialization
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
      if(!id) { throw { code: 420, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid( id )) { throw { code: 400, message: "INVALID_ID" } }

      const specialization = await Specialization.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      )
      if(!specialization) { throw { code: 500, message: "SPECIALIZATION_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "SPECIALIZATION_UPDATE_SUCCESS",
        specialization,
      })
    } catch (err) {
      return res.status(err.code || 500 ).json({
        status: false,
        message: err.message,
      })
    }
  }

  async destroy(req, res) {
    try {
      if(!id) { throw { code: 420, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid( id )) { throw { code: 400, message: "INVALID_ID" } }

      const specialization = await Specialization.findOneAndDelete({ _id: id })
      if(!specialization) { throw { code: 500, message: "SPECIALIZATION_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "SPECIALIZATION_DELETE_SUCCESS",
        specialization,
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      })
    }
  }
}

export default new SpecializationController