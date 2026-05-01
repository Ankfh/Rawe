import AppSettings from '../model/appSettingsModel.js';

/**
 * Updates the application settings.
 * @param {Object} updateData - The settings to update (maxUploadFileCount, maxUploadFileSizeMB).
 * @param {string} userId - The ID of the admin performing the update.
 */
export const updateSettingsService = async (updateData, userId) => {
  const settings = await AppSettings.findOneAndUpdate(
    {},
    {
      ...updateData,
      updatedAt: Date.now(),
      updatedBy: userId,
    },
    { upsert: true, new: true, runValidators: true }
  );

  return settings;
};
