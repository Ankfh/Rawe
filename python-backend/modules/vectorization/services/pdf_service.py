import fitz  # PyMuPDF
from typing import List, Dict

class PDFService:
    def extract_text_with_pages(self, file_path: str) -> List[Dict]:
        """
        Extracts text from each page of the PDF.
        Returns a list of dictionaries with page number and content.
        """
        extracted_pages = []
        
        try:
            doc = fitz.open(file_path)
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                text = page.get_text("text") # Extract plain text
                
                if text.strip(): # Only add pages with content
                    extracted_pages.append({
                        "page_num": page_num + 1,
                        "text": text.strip()
                    })
            doc.close()
        except Exception as e:
            print(f"[VERBOSE][AI][PDF] Error extracting from {file_path}: {str(e)}")
            raise e
            
        return extracted_pages

pdf_service = PDFService()
