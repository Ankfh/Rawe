import { updateSettingsService } from '../services/updateSettingsService.js';

export const updateSettingsController = async (req, res) => {
  try {
    const { maxUploadFileCount, maxUploadFileSizeMB } = req.body;

    // Basic validation
    if (maxUploadFileCount !== undefined && (typeof maxUploadFileCount !== 'number' || maxUploadFileCount < 1)) {
      return res.status(400).json({ success: false, message: 'Invalid maxUploadFileCount' });
    }
    if (maxUploadFileSizeMB !== undefined && (typeof maxUploadFileSizeMB !== 'number' || maxUploadFileSizeMB < 1)) {
      return res.status(400).json({ success: false, message: 'Invalid maxUploadFileSizeMB' });
    }

    const updatedSettings = await updateSettingsService(
      { maxUploadFileCount, maxUploadFileSizeMB },
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: 'Settings updated successfully.',
      data: { settings: updatedSettings },
    });
  } catch (error) {
    console.error('[ADMIN][UPDATE_SETTINGS] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update application settings.',
    });
  }
};
