import mongoose from 'mongoose'

import Document from '../models/Document.js'
import DocumentService from '../services/DocumentService.js'

class DocumentController {
  async index(req, res) {
    try {
      const processQuery = await DocumentService.processQuerySearchDocument(req)
      if(!processQuery.status) throw { code: data.code, message: "ERROR_QUERY_SEARCH" }

      const documents = await Document.find(processQuery.query)
      if(!documents) { throw { code: 404, message: "DOCUMENT_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_DOCUMENT",
        documents
      })
    } catch (err) {
      if(!err.code) { err.code = 500 }
      return res.status(err.code).json({
        status: false,
        message: err.message
      })
    }
  }

  async store(req, res) {
    try {
      const data = await DocumentService.documentDataToCreate(req)
      if (!data.status) throw { code: data.code, message: data.message }

      const newDocument = new Document(data.data)
      const document = await newDocument.save()

      if(!document) { throw { code: 500, message: "FAILED_CREATE_DOCUMENT" } }
      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_DOCUMENT",
        document
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

      const document = await Document.findOne({ _id: id })
      if(!document) { throw { code: 404, message: "DOCUMENT_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "DOCUMENT_FOUND",
        document
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
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }
      
      const document = await Document.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      )
      if(!document) { throw { code: 500, message: "DOCUMENT_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "DOCUMENT_UPDATE_SUCCESS",
        document,
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
      
      const document = await Document.findOneAndDelete({ _id: id })
      if(!document) { throw { code: 500, message: "DOCUMENT_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "DOCUMENT_DELETE_SUCCESS",
        document,
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

export default new DocumentController