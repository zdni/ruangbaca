import mongoose from "mongoose"

const Schema = mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Transaction'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: { type: String, required: true },
  paymentDate: { type: Date },
  status: {
    type: String,
    enum: [
      'process',
      'done'
    ],
    default: 'process'
  },
  createdAt: { type: Number },
  updatedAt: { type: Number },
},  {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

export default mongoose.model('Penalty', Schema)