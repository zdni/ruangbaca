import mongoose from "mongoose"

const Schema = mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  writer: { type: String, required: true },
  // cover: {
  //   data: Buffer,
  //   contentType: String
  // },
  cover: { type: String },
  studentIdNumber: { type: String },
  year: { type: Number },
  specializationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialization'
  },
  lectures: {
    mentor: {
      main: { type: String },
      second: { type: String },
    },
    examiner: {
      main: { type: String },
      second: { type: String },
      third: { type: String },
    }
  },
  storageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Storage'
  },
  publisher: { type: String },
  stock: { type: Number },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  category: {
    type: String,
    enum: [
      'book',
      'theses',
      'report',
    ],
    default: 'book'
  },
  createdAt: { type: Number },
  updatedAt: { type: Number },
},  {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

export default mongoose.model('Document', Schema)