import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import usernameExist from '../libraries/usernameExist.js' 

class UserController {
  async index(req, res) {
    try {
      const users = await User.find()
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
      if(!req.body.idNumber) { throw { code: 428, message: "ID Number is required" } }
      if(!req.body.name) { throw { code: 428, message: "Fullname is required" } }
      if(!req.body.username) { throw { code: 428, message: "Username is required" } }
      if(!req.body.password) { throw { code: 428, message: "Password is required" } }
      if(!req.body.role) { throw { code: 428, message: "Role is required" } }

      const isUsernameExist = await usernameExist(req.body.username)
      if(isUsernameExist) { throw { code: 409, message: "USERNAME_EXIST" } }
      
      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(req.body.password, salt)

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        idNumber: req.body.idNumber,
        role: req.body.role,
      })
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
      if(!req.params.id && !req.jwt.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id) && !mongoose.Types.ObjectId.isValid(req.jwt.id)) { throw { code: 400, message: "INVALID_ID" } }

      let user_id = mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : req.jwt.id

      const user = await User.findOne({ _id: user_id })
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

      const user = await User.findOneAndDelete({ _id: req.params.id })
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }
        
      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(req.body.password, salt)

      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { password: hash },
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

      const user = await User.findOne({ _id: req.params.id })
      if(!user) { throw { code: 404, message: "USER_NOT_FOUND" } }
      
      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(user.username, salt)

      const userUpdate = await User.findOneAndUpdate(
        { _id: req.params.id },
        { password: hash },
        { new: true }
      )
      if(!userUpdate) { throw { code: 500, message: "RESET_PASSWORD_USER_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "RESET_PASSWORD_USER_SUCCESS",
        userUpdate
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