import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const generateAccessToken = async (payload) => {
  return jwt.sign(
    payload,
    env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: env.JWT_ACCESS_TOKEN_LIFE }
  )
}

const generateRefreshToken = async (payload) => {
  return jwt.sign(
    payload,
    env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: env.JWT_REFRESH_TOKEN_LIFE }
  )
}

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body
      if(!username) { throw { code: 428, message: "USERNAME_IS_REQUIRED" } }
      if(!password) { throw { code: 428, message: "PASSWORD_IS_REQUIRED" } }

      const user = await User.findOne({ username: username })
      if(!user) { throw { code: 403, message: "USER_NOT_FOUND" } }
      
      const isMatch = await bcrypt.compareSync(password, user.password)
      if(!isMatch) { throw { code: 403, message: "WRONG_PASSWORD" } }

      const payload = { id: user.id, role: user.role }
      const accessToken = await generateAccessToken(payload)
      const refreshToken = await generateRefreshToken(payload)

      return res.status(200).json({
        status: true,
        message: "LOGIN_SUCCESS",
        name: user.name,
        accessToken,
        refreshToken,
      })
    } catch(err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body
      if(!refreshToken) { throw { code: 428, message: "REFRESH_TOKEN_IS_REQUIRED" } }

      const verify = await jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN_SECRET)

      const payload = { id: verify.id, role: verify.role }
      const accessToken = await generateAccessToken(payload)
      const _refreshToken = await generateRefreshToken(payload)

      return res.status(200).json({
        status: true,
        message: "REFRESH_TOKEN_SUCCESS",
        accessToken,
        _refreshToken,
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      
      if(err.message === "jwt expired") {
        err.message = "REFRESH_TOKEN_EXPIRED"
      } else if(err.message === 'invalid signature' || err.message === 'invalid token') {
        err.message = "REFRESH_TOKEN_INVALID"
      }

      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }
}

export default new AuthController