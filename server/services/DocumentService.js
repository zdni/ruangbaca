import checkValidationObjectId from '../libraries/checkValidationObjectId.js'

import Storage from '../models/Storage.js'
import Specialization from '../models/Specialization.js'
import Category from '../models/Category.js'

class DocumentService {
  async documentDataToCreate(req) {
    try {
      const {
        code,
        title,
        writer,
        storageId,
        specializationId,
        categoryId,
        studentIdNumber,
        graduationYear,
        lectures,
        publisher,
        publicationYear,
        stock,
        category,
        // file,
        // cover,
      } = req.body
      
      if(!code) return { status: false, code: 428, message: "CODE_IS_REQUIRED" }
      if(!title) return { status: false, code: 428, message: "TITLE_IS_REQUIRED" }
      if(!writer) return { status: false, code: 428, message: "WRITER_IS_REQUIRED" }
      if(!storageId) return { status: false, code: 428, message: "STORAGE_IS_REQUIRED" }

      // storageId
      const checkStorageId = await checkValidationObjectId(storageId, Storage, "STORAGE")
      if(!checkStorageId.status) return checkStorageId

      let data = {
        code,
        title, 
        writer,
        storageId
      }

      // specializationId
      if(specializationId) {
        const checkSpecializationId = await checkValidationObjectId(specializationId, Specialization, "SPECIALIZATION")
        if(!checkSpecializationId.status) return checkSpecializationId

        data['specializationId'] = specializationId
      }

      // categoryId
      if(categoryId) {
        const checkCategoryId = await checkValidationObjectId(categoryId, Category, "CATEGORY")
        if(!checkCategoryId.status) return checkCategoryId
      
        data['categoryId'] = categoryId
      }

      if(category) data['category'] = category
      if(graduationYear) data['graduationYear'] = graduationYear
      if(lectures) data['lectures'] = lectures
      if(publicationYear) data['publicationYear'] = publicationYear
      if(publisher) data['publisher'] = publisher
      if(stock) data['stock'] = stock
      if(studentIdNumber) data['studentIdNumber'] = studentIdNumber
      
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

  async processQuerySearchDocument(req) {
    try {
      let query = {}
      const { 
        category, 
        categoryId, 
        specializationId,
        storageId,
        title,
      } = req.query

      // query where
      if(category) query['category'] = category
      if(categoryId) {
        const checkCatId = await checkValidationObjectId(categoryId, Category, "CATEGORY")
        if(checkCatId.status) query['categoryId'] = categoryId
      }
      if(specializationId) {
        const checkSpecId = await checkValidationObjectId(specializationId, Specialization, "SPECIALIZATION")
        if(checkSpecId.status) query['specializationId'] = specializationId
      }
      if(storageId) {
        const checkStorId = await checkValidationObjectId(storageId, Storage, "STORAGE")
        if(checkStorId.status) query['storageId'] = storageId
      }
      if(title) {
        query['title'] = {
          $regex: title.toLowerCase(),
          $options: "si"
        }
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

export default new DocumentService