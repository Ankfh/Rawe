import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    storedName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    processingError: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.index({ userId: 1, uploadedAt: -1, _id: -1 });
bookSchema.index({ processingStatus: 1 });

const BookModel = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default BookModel;
