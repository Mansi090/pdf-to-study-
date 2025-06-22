import io
from fastapi import UploadFile
from PyPDF2 import PdfReader
from docx import Document

async def extract_text_from_file(file: UploadFile) -> str:
    contents = await file.read()
    if file.filename.lower().endswith(".pdf"):
        reader = PdfReader(io.BytesIO(contents))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
        return text
    elif file.filename.lower().endswith(".docx"):
        doc = Document(io.BytesIO(contents))
        text = "\n".join([para.text for para in doc.paragraphs])
        return text
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX are supported.")
