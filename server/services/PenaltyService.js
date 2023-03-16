import checkValidationObjectId from "../libraries/checkValidationObjectId.js"

import Transaction from '../models/Transaction.js'
import User from '../models/User.js'

class PenaltyService {
  async processData(req) {
    try {
      const {
        transactionId,
        description,
        paymentDate,
        status,
        userId,
      } = req.body

      if(!description) return { status: false, code: 428, message: "DESCRIPTION_IS_REQUIRED" }
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
        description
      }
      if(paymentDate) data['paymentDate'] = paymentDate
      if(status) data['status'] = status

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
        status,
        userId,
      } = req.query

      // query where
      if(!status) status = 'process'
      if(userId) {
        const checkUserId = await checkValidationObjectId(userId, User, "USER")
        if(checkUserId.status) query['userId'] = userId
      }
      if(transactionId) {
      const checkTransId = await checkValidationObjectId(transactionId, Transaction, "TRANSACTION")
        if(checkTransId.status) query['transactionId'] = transactionId
      }
      if(status && status !== 'all') {
        query['status'] = status
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

export default new PenaltyService