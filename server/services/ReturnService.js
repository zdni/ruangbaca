import checkValidationObjectId from "../libraries/checkValidationObjectId.js"

import Transaction from '../models/Transaction.js'
import User from '../models/User.js'

class ReturnService {
  async processData(req) {
    try {
      const {
        transactionId,
        date,
        userId,
      } = req.body

      if(!transactionId) return { status: false, code: 428, message: "TRANSACTION_IS_REQUIRED" }
      if(!userId) return { status: false, code: 428, message: "USER_IS_REQUIRED" }

      // transactionId
      const checkTransId = await checkValidationObjectId(transactionId, Transaction, "TRANSACTION")
      if(!checkTransId.status) return checkTransId
      
      // userId
      const checkUserId = await checkValidationObjectId(userId, User, "USER")
      if(!checkUserId.status) return checkUserId
      
      let data = {
        transactionId,
        userId,
        date
      }

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
      let {
        transactionId,
        userId,
      } = req.query

      // query where
      if(userId) {
        const checkUserId = await checkValidationObjectId(userId, User, "USER")
        if(checkUserId.status) query['userId'] = userId
      }
      if(transactionId) {
      const checkTransId = await checkValidationObjectId(transactionId, Transaction, "TRANSACTION")
        if(checkTransId.status) query['transactionId'] = transactionId
      }

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
}

export default new ReturnService