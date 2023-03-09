import mongoose from "mongoose"

const Schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Document'
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: [
      'submission',
      'approve',
      'done',
      'late',
      'late_done',
      'paid_done',
      'cancel'
    ],
    default: 'submission'
  },
  createdAt: { type: Number },
  updatedAt: { type: Number },
},  {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

export default mongoose.model('Transaction', Schema)