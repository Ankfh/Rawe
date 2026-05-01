import AppSettings from '../model/appSettingsModel.js';

/**
 * Fetches the application settings.
 * If no settings document exists, creates one with default values.
 */
export const getSettingsService = async () => {
  let settings = await AppSettings.findOne({});

  if (!settings) {
    settings = await AppSettings.create({});
  }

  return settings;
};
