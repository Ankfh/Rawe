from typing import List
from sentence_transformers import SentenceTransformer
import numpy as np

class EmbedderService:
    _instance = None
    _model = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(EmbedderService, cls).__new__(cls)
            # Using all-MiniLM-L6-v2: 384 dimensions, fast and lightweight
            cls._model = SentenceTransformer('all-MiniLM-L6-v2')
        return cls._instance

    def embed_chunks(self, chunks: List[str]) -> np.ndarray:
        """
        Convert a list of text chunks into a matrix of embeddings.
        """
        if not chunks:
            return np.array([])
        
        embeddings = self._model.encode(chunks, convert_to_numpy=True)
        return embeddings

# Singleton instance for easy access
embedder_service = EmbedderService()
