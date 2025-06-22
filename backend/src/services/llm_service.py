from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from services.pinecone_service import upsert_text, query_similar_chunks
import os
import json

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY, temperature=0.3)

# Helper: Chunk text
async def chunk_and_upsert(text: str, doc_id: str):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_text(text)
    for i, chunk in enumerate(chunks):
        await upsert_text(chunk, f"{doc_id}-{i}")
    return chunks

# Helper: Retrieve context
async def get_context(query: str, top_k: int = 3):
    results = await query_similar_chunks(query, top_k=top_k)
    if hasattr(results, 'matches'):
        return "\n".join([m['metadata'].get('text', '') for m in results.matches if 'metadata' in m])
    return ""

async def summarize_text(text: str) -> str:
    await chunk_and_upsert(text, "summary")
    context = await get_context(text)
    prompt = ChatPromptTemplate.from_template(
        """
        Use the following context to summarize in 3-5 bullet points (max 100 words):
        Context: {context}
        Input: {input}
        """
    )
    chain = prompt | llm
    result = await chain.ainvoke({"context": context, "input": text})
    return result.content.strip()

async def generate_flashcards(text: str) -> list:
    await chunk_and_upsert(text, "flashcards")
    context = await get_context(text)
    prompt = ChatPromptTemplate.from_template(
        """
        Use the following context to generate 5-10 flashcards (Q&A pairs). Format as JSON list: [{{"question": "...", "answer": "..."}}, ...]
        Context: {context}
        Input: {input}
        """
    )
    chain = prompt | llm
    result = await chain.ainvoke({"context": context, "input": text})
    try:
        return json.loads(result.content)
    except Exception:
        return result.content.strip()

async def generate_mcqs(text: str) -> list:
    await chunk_and_upsert(text, "mcqs")
    context = await get_context(text)
    prompt = ChatPromptTemplate.from_template(
        """
        Use the following context to generate 5 MCQs. Each question should have 4 options and indicate the correct answer. Format as JSON list: [{{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}}, ...]
        Context: {context}
        Input: {input}
        """
    )
    chain = prompt | llm
    result = await chain.ainvoke({"context": context, "input": text})
    try:
        return json.loads(result.content)
    except Exception:
        return result.content.strip()

async def generate_quiz(text: str) -> dict:
    await chunk_and_upsert(text, "quiz")
    context = await get_context(text)
    prompt = ChatPromptTemplate.from_template(
        """
        Use the following context to generate quiz game data. Format as JSON: {{"questions": [{{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}}, ...], "scoring": "..."}}
        Context: {context}
        Input: {input}
        """
    )
    chain = prompt | llm
    result = await chain.ainvoke({"context": context, "input": text})
    try:
        return json.loads(result.content)
    except Exception:
        return result.content.strip()
