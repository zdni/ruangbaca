import Category from "../models/Category.js"
import Specialization from "../models/Specialization.js"
import Storage from "../models/Storage.js"

class MasterDataController {
  async index(req, res) {
    try {
      const categories = await Category.find()
      const specializations = await Specialization.find()
      const storages = await Storage.find()
      if( !categories ) { throw { code: 404, message: "CATEGORY_DATA_NOT_FOUND" } }
      if( !specializations ) { throw { code: 404, message: "SPECIALIZATION_DATA_NOT_FOUND" } }
      if( !storages ) { throw { code: 404, message: "STORAGE_DATA_NOT_FOUND" } }

      return res.status(200).json({
        status: true,
        message: "LIST_MASTER_DATA",
        categories,
        specializations,
        storages,
      })
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      })
    }
  }
}

export default new MasterDataController