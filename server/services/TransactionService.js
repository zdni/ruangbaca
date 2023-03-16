import checkValidationObjectId from "../libraries/checkValidationObjectId.js"

import Document from "../models/Document.js"
import User from "../models/User.js"

class TransactionService {
  async processData(req) {
    try {
      let data = {}
      const {
        userId,
        documentId,
        startDate,
        endDate,
        status
      } = req.body

      if(!endDate) return { status: false, code: 428, message: "END_DATE_IS_REQUIRED" }
      if(!startDate) return { status: false, code: 428, message: "START_DATE_IS_REQUIRED" }
      if(!documentId) return { status: false, code: 428, message: "DOCUMENT_IS_REQUIRED" }
      if(!userId) return { status: false, code: 428, message: "USER_IS_REQUIRED" }

      // documentId
      const checkTDocId = await checkValidationObjectId(documentId, Document, "DOCUMENT")
      if(!checkTDocId.status) return checkTDocId
      
      // userId
      const checkUserId = await checkValidationObjectId(userId, User, "USER")
      if(!checkUserId.status) return checkUserId

      data = {
        userId,
        documentId,
        startDate,
        endDate,
      }

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
      const {
        status,
      } = req.query

      let query = {}

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

export default new TransactionService