from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Any
from services.file_service import extract_text_from_file
from services.llm_service import summarize_text, generate_flashcards, generate_mcqs, generate_quiz

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        text = await extract_text_from_file(file)
        return {"filename": file.filename, "text": text}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="File processing failed.")

class TextRequest(BaseModel):
    text: str

@router.post("/summarize")
async def summarize(request: TextRequest):
    try:
        summary = await summarize_text(request.text)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail="LLM summarization failed.")

@router.post("/flashcards")
async def flashcards(request: TextRequest):
    try:
        flashcards = await generate_flashcards(request.text)
        return {"flashcards": flashcards}
    except Exception as e:
        raise HTTPException(status_code=500, detail="LLM flashcard generation failed.")

@router.post("/mcqs")
async def mcqs(request: TextRequest):
    try:
        mcqs = await generate_mcqs(request.text)
        return {"mcqs": mcqs}
    except Exception as e:
        raise HTTPException(status_code=500, detail="LLM MCQ generation failed.")

@router.post("/quiz")
async def quiz(request: TextRequest):
    try:
        quiz = await generate_quiz(request.text)
        return {"quiz": quiz}
    except Exception as e:
        raise HTTPException(status_code=500, detail="LLM quiz generation failed.")
