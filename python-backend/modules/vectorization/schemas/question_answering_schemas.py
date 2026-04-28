from pydantic import BaseModel
from typing import List, Dict, Optional

class AskQuestionRequest(BaseModel):
    bookId: str
    question: str

class AskQuestionResponse(BaseModel):
    success: bool
    answer: str
    context: Optional[List[Dict]] = None # Raw chunks used for the answer
    message: Optional[str] = None
