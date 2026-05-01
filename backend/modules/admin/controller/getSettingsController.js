import { getSettingsService } from '../services/getSettingsService.js';

export const getSettingsController = async (req, res) => {
  try {
    const settings = await getSettingsService();
    return res.status(200).json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    console.error('[ADMIN][GET_SETTINGS] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch application settings.',
    });
  }
};
