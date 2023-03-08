import mongoose from "mongoose"
import Storage from '../models/Storage.js'

class StorageController {
  async index(req, res) {
    try {
      const storages = await Storage.find()
      if( !storages ) { throw { code: 404, message: "STORAGE_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_STORAGE",
        storages
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
      const { name } = req.body
      if(!name) { throw { code: 428, message: "NAME_IS_REQUIRED" } }
      
      const newStorage = new Storage({
        name: name
      })
      const storage = await newStorage.save()
      if( !storage ) { throw { code: 500, message: "FAILED_CREATE_STORAGE" } }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_STORAGE",
        storage
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

      const storage = await Storage.findOne({ _id: id })
      if(!storage) { throw { code: 404, message: "STORAGE_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "STORAGE_FOUND",
        storage
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
      if(!id) { throw { code: 420, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid( id )) { throw { code: 400, message: "INVALID_ID" } }

      const storage = await Storage.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      )
      if(!storage) { throw { code: 500, message: "STORAGE_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "STORAGE_UPDATE_SUCCESS",
        storage,
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
      const {id} = req.params
      if(!id) { throw { code: 420, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid( id )) { throw { code: 400, message: "INVALID_ID" } }

      const storage = await Storage.findOneAndDelete({ _id: id })
      if(!storage) { throw { code: 500, message: "STORAGE_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "STORAGE_DELETE_SUCCESS",
        storage,
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      })
    }
  }
}

export default new StorageController