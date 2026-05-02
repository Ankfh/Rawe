import os
import pickle
import faiss
import numpy as np
from typing import List, Dict

class VectorStorageService:
    def __init__(self, base_path: str = "/app/uploads/vectors"):
        self.base_path = base_path
        if not os.path.exists(self.base_path):
            os.makedirs(self.base_path, exist_ok=True)

    def get_book_dir(self, book_id: str) -> str:
        book_dir = os.path.join(self.base_path, book_id)
        os.makedirs(book_dir, exist_ok=True)
        return book_dir

    def save_index(self, book_id: str, embeddings: np.ndarray, chunks: List[Dict]):
        """
        Saves the FAISS index and the compressed chunks metadata.
        """
        book_dir = self.get_book_dir(book_id)
        
        # 1. Create and save FAISS index
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatIP(dimension) # Inner Product (cosine similarity for normalized vectors)
        
        # Normalize for cosine similarity
        faiss.normalize_L2(embeddings)
        index.add(embeddings)
        
        index_path = os.path.join(book_dir, "index.faiss")
        faiss.write_index(index, index_path)
        
        # 2. Save metadata (text chunks) using Pickle
        meta_path = os.path.join(book_dir, "chunks.pkl")
        with open(meta_path, 'wb') as f:
            # We can use highest protocol for speed and efficiency
            pickle.dump(chunks, f, protocol=pickle.HIGHEST_PROTOCOL)
            
        print(f"[VERBOSE][AI][STORAGE] Saved index and metadata for book {book_id}")

    def load_index(self, book_id: str):
        """
        Loads the FAISS index and metadata for a specific book.
        """
        book_dir = os.path.join(self.base_path, book_id)
        index_path = os.path.join(book_dir, "index.faiss")
        meta_path = os.path.join(book_dir, "chunks.pkl")
        
        if not os.path.exists(index_path) or not os.path.exists(meta_path):
            return None, None
            
        index = faiss.read_index(index_path)
        with open(meta_path, 'rb') as f:
            chunks = pickle.load(f)
            
        return index, chunks

    def delete_index(self, book_id: str) -> bool:
        """
        Deletes the FAISS index and metadata for a specific book.
        """
        import shutil
        book_dir = os.path.join(self.base_path, book_id)
        if os.path.exists(book_dir):
            try:
                shutil.rmtree(book_dir)
                print(f"[VERBOSE][AI][STORAGE] Deleted index and metadata for book {book_id}")
                return True
            except Exception as e:
                print(f"[VERBOSE][AI][STORAGE] Error deleting index for book {book_id}: {str(e)}")
                return False
        return False

vector_storage_service = VectorStorageService()
