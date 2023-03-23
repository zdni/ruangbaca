import dotenv from "dotenv"
import mongoose from "mongoose"

const env = dotenv.config().parsed

const connection = () => {
  mongoose.set("strictQuery", false);
  // mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
  //   dbName: `${env.MONGODB_DB_NAME}`
  // })
  mongoose.connect(`${env.MONGODB_ATLAS_URL}`, {
    dbName: `${env.MONGODB_ATLAS_DB_NAME}`
  })
  const connection = mongoose.connection
  connection.on('error', console.error.bind( console, 'connection error:' ))
  connection.once('open', () => {
    console.log('Connected to MongoDB')
  })
}

export default connection