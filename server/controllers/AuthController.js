import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const generateAccessToken = async (payload) => {
  return jwt.sign(
    payload,
    env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: env.JWT_REFRESH_TOKEN_LIFE }
  )
}

const generateRefreshToken = async (payload) => {
  return jwt.sign(
    payload,
    env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: env.JWT_REFRESH_TOKEN_LIFE }
  )
}

class AuthController {
  async login(req, res) {
    try {
      if(!req.body.username) { throw { code: 428, message: "Username is required" } }
      if(!req.body.password) { throw { code: 428, message: "Password is required" } }

      const user = await User.findOne({ username: req.body.username })
      if(!user) { throw { code: 403, message: "USERNAME_NOT_FOUND" } }
      console.log(req.body.password)
      const isMatch = await bcrypt.compareSync(req.body.password, user.password)
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
      if(!req.body.refreshToken) { throw { code: 428, message: "Refresh Token is required" } }

      const verify = await jwt.verify(req.body.refreshToken, env.JWT_REFRESH_TOKEN_SECRET)

      const payload = { id: verify.id, role: verify.role }
      const accessToken = await generateAccessToken(payload)
      const refreshToken = await generateRefreshToken(payload)

      return res.status(200).json({
        status: true,
        message: "REFRESH_TOKEN_SUCCESS",
        accessToken,
        refreshToken,
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