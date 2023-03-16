import mongoose from "mongoose"

const Schema = mongoose.Schema({
  classYear: { type: String },
  idNumber: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: {
    type: String,
    enum: [
      'admin',
      'lecture',
      'student'
    ],
    default: 'student'
  },
  // image: {
  //   data: Buffer,
  //   contentType: String
  // },
  image: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
}, {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

export default mongoose.model('User', Schema)