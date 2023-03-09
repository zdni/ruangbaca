import bcrypt from 'bcrypt'

import User from '../models/User.js'
import usernameExist from "../libraries/usernameExist.js"

class UserService {
  async processData(req) {
    try {
      const {
        classYear,
        idNumber,
        name,
        username,
        // password,
        role,
      } = req.body

      if(!idNumber) { return { status: false, code: 428, message: "ID_NUMBER_IS_REQUIRED" } }
      if(!name) { return { status: false, code: 428, message: "FULLNAME_IS_REQUIRED" } }
      if(!username) { return { status: false, code: 428, message: "USERNAME_IS_REQUIRED" } }
      // if(!password) { return { status: false, code: 428, message: "PASSWORD_IS_REQUIRED" } }
      const password = username

      const isUsernameExist = await usernameExist(username)
      if(isUsernameExist) { return { status: false, code: 409, message: "USERNAME_EXIST" } }

      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(password, salt)
      
      let data = {
        idNumber,
        name,
        username,
        password: hash,
      }
      if(role) data['role'] = role
      if(classYear) data['classYear'] = classYear

      return {
        status: true,
        data
      }
    } catch (err) {
      if(!err.status) err.status = false
      if(!err.code) err.code = 500
      return err
    }
  }

  async processQuerySearch(req) {
    try {
      let query = {}
      const {
        role,
      } = req.body

      if(role) query['role'] = role

      return {
        status: true,
        query
      }
    } catch (err) {
      if(!err.status) err.status = false
      if(!err.code) err.code = 500
      return err
    }
  }

  async processChangePassword(req) {
    try {
      const {
        oldPassword,
        newPassword,
        confirmPassword
      } = req.body
      const {id} = req.params

      if(!id) { return { status: false, code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { return { status: false, code: 400, message: "INVALID_ID" } }

      const user = await User.findById(id)
      if(!user) { return { status: false, code: 404, message: "USER_NOT_FOUND" } }

      const isMatch = await bcrypt.compareSync(oldPassword, user.password)
      if(!isMatch) { return { status: false, code: 401, message: "WRONG_OLD_PASSWORD" } }

      if(newPassword !== confirmPassword) { return { status: false, code: 403, message: "WRONG_CONFIRM_PASSWORD" } }

      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(password, salt)

      return {
        status: true,
        password: hash
      }
    } catch (err) {
      if(!err.status) err.status = false
      if(!err.code) err.code = 500
      return err
    }
  }

  async processResetPassword(req) {
    try {
      const {id} = req.params

      if(!id) { return { status: false, code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { return { status: false, code: 400, message: "INVALID_ID" } }

      const user = await User.findById(id)
      if(!user) { return { status: false, code: 404, message: "USER_NOT_FOUND" } }

      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(user.username, salt)

      return {
        status: true,
        password: hash
      }
    } catch (err) {
      if(!err.status) err.status = false
      if(!err.code) err.code = 500
      return err
    }
  }
}

export default new UserService