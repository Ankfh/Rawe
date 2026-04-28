from typing import List, Dict

class ChunkingService:
    def __init__(self, chunk_size: int = 600, overlap: int = 100):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def create_chunks(self, pages: List[Dict]) -> List[Dict]:
        """
        Splits extracted page text into overlapping semantic chunks.
        Preserves metadata (page number) for each chunk.
        """
        all_chunks = []
        
        for page in pages:
            text = page["text"]
            page_num = page["page_num"]
            
            # Simple windowed chunking for now
            # In a more advanced version, we could split by paragraphs or sentences
            start = 0
            chunk_count = 0
            
            while start < len(text):
                end = start + self.chunk_size
                chunk_text = text[start:end]
                
                all_chunks.append({
                    "text": chunk_text,
                    "page_num": page_num,
                    "chunk_index": chunk_count
                })
                
                start += (self.chunk_size - self.overlap)
                chunk_count += 1
                
        return all_chunks

chunking_service = ChunkingService()
