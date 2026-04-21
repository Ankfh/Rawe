from fastapi import APIRouter
from modules.vectorization.schemas.upload_notification_schemas import (
    UploadNotificationRequest,
    UploadNotificationResponse,
)
from modules.vectorization.services.upload_notification_service import (
    log_upload_notification,
)

vectorization_router = APIRouter(prefix="/api/vectorization", tags=["vectorization"])


@vectorization_router.post("/upload-notification", response_model=UploadNotificationResponse)
async def upload_notification(payload: UploadNotificationRequest):
    await log_upload_notification(payload)
    return UploadNotificationResponse(
        success=True,
        message="Upload notification received successfully.",
    )
