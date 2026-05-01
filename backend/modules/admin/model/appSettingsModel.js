import mongoose from 'mongoose';

const appSettingsSchema = new mongoose.Schema({
  maxUploadFileCount: {
    type: Number,
    default: 10,
    min: 1,
    max: 100,
  },
  maxUploadFileSizeMB: {
    type: Number,
    default: 50,
    min: 1,
    max: 500,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const AppSettings = mongoose.model('AppSettings', appSettingsSchema);

export default AppSettings;
