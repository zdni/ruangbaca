import mongoose from 'mongoose'
import Document from '../models/Document.js'

class DocumentController {
  async index(req, res) {
    try {
      const documents = await Document.find()
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
      if(!req.body.code) { throw { code: 428, message: "Code Book is required" } }
      if(!req.body.title) { throw { code: 428, message: "Title is required" } }
      if(!req.body.writer) { throw { code: 428, message: "Writer is required" } }
      if(!req.body.storageId) { throw { code: 428, message: "Storage is required" } }

      if(!mongoose.Types.ObjectId.isValid(req.body.storageId)) { throw { code: 400, message: "INVALID_STORAGE_ID" } }
      if(req.body.specializationId) {
        if(!mongoose.Types.ObjectId.isValid(req.body.specializationId)) { throw { code: 400, message: "INVALID_SPECIALIZATION_ID" } }
      }
      if(req.body.categoryId) {
        if(!mongoose.Types.ObjectId.isValid(req.body.categoryId)) { throw { code: 400, message: "INVALID_CATEGORY_ID" } }
      }

      const newDocument = new Document({
        code: req.body.code,
        title: req.body.title,
        writer: req.body.writer,
        specializationId: req.body.specializationId,
        storageId: req.body.storageId,
        categoryId: req.body.categoryId,
      })
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

      const document = await Document.findOne({ _id: req.params.id })
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }
      
      const document = await Document.findByIdAndUpdate(
        { _id: req.params.id },
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
      if(!req.params.id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }
      
      const document = await Document.findOneAndDelete({ _id: req.params.id })
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