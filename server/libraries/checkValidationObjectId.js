import mongoose from "mongoose"

const checkValidationObjectId = async (id, model, modelStr) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: false,
        code: 400,
        message: `INVALID_${modelStr}_ID`
      }
    }

    const data = await model.findById(id)
    if(!data) {
      return {
        status: false, 
        code: 404,
        message: `${modelStr}_NOT_FOUND`
      }
    } 

    return {
      status: true,
    }
  } catch(err) {
    return {
      status: false,
      code: 400,
      message: `INVALID_${modelStr}_ID`
    }
  }
}

export default checkValidationObjectId