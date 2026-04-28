import os
import requests
from fastapi import BackgroundTasks
from modules.vectorization.schemas.upload_notification_schemas import UploadNotificationRequest
from modules.vectorization.services.pdf_service import pdf_service
from modules.vectorization.services.chunking_service import chunking_service
from modules.vectorization.services.embedder_service import embedder_service
from modules.vectorization.services.vector_storage_service import vector_storage_service
from shared.config.settings import get_settings

settings = get_settings()

def update_node_status(book_id: str, status: str, error: str = None):
    """
    Sends a callback to the Node.js backend to update the book's processing status.
    """
    url = f"{settings['node_backend_url']}/api/upload-file/status"
    payload = {
        "bookId": book_id,
        "status": status,
        "processingError": error
    }
    try:
        requests.post(url, json=payload, timeout=10)
    except Exception as e:
        print(f"[VERBOSE][AI][EXT] Error notifying Node.js: {str(e)}")

async def process_pdf_ai_pipeline(payload: UploadNotificationRequest):
    """
    The main RAG background task:
    1. Extract text from PDF
    2. Split into chunks
    3. Generate embeddings
    4. Save FAISS index and metadata
    """
    book_id = payload.bookId
    # Note: Use the path from settings + the stored filename for safer Docker paths
    file_path = os.path.join(settings["uploads_path"], payload.storedName)
    
    print(f"[VERBOSE][AI][START] Processing book {book_id} at {file_path}")
    
    try:
        # 1. Extraction (PyMuPDF)
        pages = pdf_service.extract_text_with_pages(file_path)
        
        # 2. Chunking
        chunks = chunking_service.create_chunks(pages)
        
        # 3. Embedding (all-MiniLM-L6-v2)
        text_only = [item["text"] for item in chunks]
        embeddings = embedder_service.embed_chunks(text_only)
        
        # 4. Storage (FAISS + Pickle)
        vector_storage_service.save_index(book_id, embeddings, chunks)
        
        # 5. Success!
        update_node_status(book_id, "completed")
        print(f"[VERBOSE][AI][SUCCESS] Book {book_id} processed successfully.")
        
    except Exception as e:
        error_msg = str(e)
        print(f"[VERBOSE][AI][ERROR] Processing failed for {book_id}: {error_msg}")
        update_node_status(book_id, "failed", error_msg)

async def start_ai_processing(payload: UploadNotificationRequest, background_tasks: BackgroundTasks) -> None:
    """
    Starts the AI pipeline in the background and returns immediately.
    """
    background_tasks.add_task(process_pdf_ai_pipeline, payload)
