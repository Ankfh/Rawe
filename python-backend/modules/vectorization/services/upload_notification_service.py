from modules.vectorization.schemas.upload_notification_schemas import UploadNotificationRequest


async def log_upload_notification(payload: UploadNotificationRequest) -> None:
    print(
        "[PYTHON][VECTORIZATION] Upload notification received:",
        {
            "bookId": payload.bookId,
            "originalName": payload.originalName,
            "storedName": payload.storedName,
            "size": payload.size,
            "mimeType": payload.mimeType,
            "uploadedAt": payload.uploadedAt,
            "filePath": payload.filePath,
            "destination": payload.destination,
        },
    )
