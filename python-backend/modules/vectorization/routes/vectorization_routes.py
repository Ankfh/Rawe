from fastapi import APIRouter, BackgroundTasks
from modules.vectorization.schemas.question_answering_schemas import (
    AskQuestionRequest,
    AskQuestionResponse,
)
from modules.vectorization.schemas.upload_notification_schemas import (
    UploadNotificationRequest,
    UploadNotificationResponse,
)
from modules.vectorization.services.upload_notification_service import (
    start_ai_processing,
)
from modules.vectorization.services.search_service import search_service
from modules.vectorization.services.llm_service import llm_service

vectorization_router = APIRouter(prefix="/api/vectorization", tags=["vectorization"])


@vectorization_router.post("/upload-notification", response_model=UploadNotificationResponse)
async def upload_notification(payload: UploadNotificationRequest, background_tasks: BackgroundTasks):
    await start_ai_processing(payload, background_tasks)
    return UploadNotificationResponse(
        success=True,
        message="AI processing started in the background.",
    )


@vectorization_router.post("/ask", response_model=AskQuestionResponse)
async def ask_question(payload: AskQuestionRequest):
    print(f"DEBUG: ask_question payload: {payload}")
    # 1. Retrieve the Top-3 relevant context chunks
    context = search_service.search_relevant_context(payload.bookId, payload.question, top_k=3)
    print(f"DEBUG: context retrieved: {context}")
    
    # 2. Generate the answer via OpenRouter
    answer = llm_service.generate_answer(payload.question, context)
    print(f"DEBUG: answer generated: {answer}")
    
    return AskQuestionResponse(
        success=True,
        answer=answer,
        context=context
    )
