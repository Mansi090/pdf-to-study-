import os
import pinecone
from langchain.embeddings import OpenAIEmbeddings

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")
INDEX_NAME = os.getenv("PINECONE_INDEX", "study-tool-index")

embeddings = OpenAIEmbeddings()

# Initialize Pinecone
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENV)

index = None
if INDEX_NAME in pinecone.list_indexes():
    index = pinecone.Index(INDEX_NAME)
else:
    # Create index if not exists
    pinecone.create_index(INDEX_NAME, dimension=1536, metric="cosine")
    index = pinecone.Index(INDEX_NAME)

async def upsert_text(text: str, doc_id: str):
    # TODO: Use LangChain for chunking and embedding
    vectors = embeddings.embed_documents([text])
    index.upsert([(doc_id, vectors[0])])

async def query_similar_chunks(query: str, top_k: int = 3):
    # TODO: Use LangChain for embedding query
    query_vec = embeddings.embed_query(query)
    results = index.query([query_vec], top_k=top_k, include_metadata=True)
    return results
