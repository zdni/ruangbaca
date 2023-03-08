import mongoose from "mongoose"

const Schema = mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Transaction'
  },
  date: { type: Date, required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
},  {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

export default mongoose.model('Return', Schema)