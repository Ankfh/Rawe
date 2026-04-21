from pydantic import BaseModel


class UploadNotificationRequest(BaseModel):
    bookId: str
    originalName: str
    storedName: str
    size: int
    mimeType: str
    uploadedAt: str
    filePath: str
    destination: str


class UploadNotificationResponse(BaseModel):
    success: bool
    message: str
