import faiss
import numpy as np
from typing import List, Dict
from modules.vectorization.services.vector_storage_service import vector_storage_service
from modules.vectorization.services.embedder_service import embedder_service

class SearchService:
    def search_relevant_context(self, book_id: str, query: str, top_k: int = 3) -> List[Dict]:
        """
        Retrieves the most semantically relevant text chunks for a given query.
        """
        # 1. Load the index and metadata
        index, chunks = vector_storage_service.load_index(book_id)
        
        if index is None or chunks is None:
            print(f"[VERBOSE][AI][SEARCH] No index found for book {book_id}")
            return []

        # 2. Embed the query
        query_vector = embedder_service.embed_chunks([query])
        faiss.normalize_L2(query_vector)

        # 3. Search the index
        distances, indices = index.search(query_vector, top_k)

        # 4. Filter and format results
        results = []
        for i in range(len(indices[0])):
            idx = indices[0][i]
            if idx != -1: # FAISS returns -1 if not enough results
                results.append(chunks[idx])

        return results

search_service = SearchService()
