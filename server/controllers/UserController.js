import mongoose from 'mongoose'

import User from '../models/User.js'
import UserService from '../services/UserService.js'

class UserController {
  async index(req, res) {
    try {
      const processQuery = await UserService.processQuerySearch(req)
      if(!processQuery.status) throw { code: processQuery.code, message: "ERROR_QUERY_SEARCH" }
      
      const users = await User.find(processQuery.query)
        .select('-password')
      if(!users) { throw { code: 404, message: "USER_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_USER",
        users
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message
      })
    }
  }

  async store(req, res) {
    try {
      const data = await UserService.processData(req)
      if (!data.status) throw { code: data.code, message: data.message }

      const newUser = new User(data.data)
      const user = await newUser.save()

      if(!user) { throw { code: 500, message: "USER_REGISTER_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "USER_REGISTER_SUCCESS",
        user,
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

      const user = await User.findById(id).select('-password')
      if(!user) { throw { code: 404, message: "USER_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "USER_FOUND",
        user
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

      const user = await User.findOneAndDelete({ _id: id })
      if(!user) { throw { code: 500, message: "USER_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "USER_DELETE_SUCCESS",
        user
      })
    } catch (err) {
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async changePassword(req, res) {
    try {
      const data = await UserService.processChangePassword(req)
      if (!data.status) throw { code: data.code, message: data.message }

      const user = await User.findOneAndUpdate(
        { _id: id },
        { password: data.password },
        { new: true }
      )
      if(!user) { throw { code: 500, message: "CHANGE_PASSWORD_USER_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "CHANGE_PASSWORD_USER_SUCCESS",
        user
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async resetPassword(req, res) {
    try {
      const data = await UserService.processResetPassword(req)
      if (!data.status) throw { code: data.code, message: data.message }

      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { password: data.password },
        { new: true }
      )
      if(!user) { throw { code: 500, message: "RESET_PASSWORD_USER_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "RESET_PASSWORD_USER_SUCCESS",
        user
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async changeProfilePicture(req, res) {
    try {
      
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async userFromToken(req, res) {
    try {
      const {id} = req.jwt

      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const user = await User.findById(id).select('-password')
      if(!user) { throw { code: 404, message: "USER_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "USER_FOUND",
        user
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

export default new UserController