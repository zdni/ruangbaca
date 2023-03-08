import mongoose from 'mongoose'
import Category from '../models/Category.js'

class CategoryController {
  async index(req, res) {
    try {
      const categories = await Category.find()
      if( !categories ) { throw { code: 404, message: "CATEGORY_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_CATEGORY",
        categories
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      })
    }
  }

  async store(req, res) {
    try {
      const { name } = req.body
      if(!name) { throw { code: 428, message: "NAME_IS_REQUIRED" } }

      const newCategory = new Category({
        name: name
      })
      const category = await newCategory.save()
      if( !category ) { throw { code: 500, message: "FAILED_CREATE_CATEGORY" } }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_CATEGORY",
        category
      })
    } catch (err) {
      return res.status( err.code || 500 ).json({
        status: false,
        message: err.message,
      })
    }
  }

  async show(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 428, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid(id)) { throw { code: 400, message: "INVALID_ID" } }

      const category = await Category.findOne({ _id: id })
      if(!category) { throw { code: 404, message: "CATEGORY_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "CATEGORY_FOUND",
        category
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
      if(!id) { throw { code: 420, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid( id )) { throw { code: 400, message: "INVALID_ID" } }

      const category = await Category.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      )
      if(!category) { throw { code: 500, message: "FORM_UPDATE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "CATEGORY_UPDATE_SUCCESS",
        category,
      })
    } catch (err) {
      return res.status(err.code || 500 ).json({
        status: false,
        message: err.message,
      })
    }
  }

  async destroy(req, res) {
    try {
      const {id} = req.params
      if(!id) { throw { code: 420, message: "ID_REQUIRED" } }
      if(!mongoose.Types.ObjectId.isValid( id )) { throw { code: 400, message: "INVALID_ID" } }

      const category = await Category.findOneAndDelete({ _id: id })
      if(!category) { throw { code: 500, message: "CATEGORY_DELETE_FAILED" } }

      return res.status(200).json({
        status: true,
        message: "CATEGORY_DELETE_SUCCESS",
        category,
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      })
    }
  }
}

export default new CategoryController

// IS_REQUIRED