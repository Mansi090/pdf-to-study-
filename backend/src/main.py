from fastapi import FastAPI
from api.endpoints import router

app = FastAPI(title="Multi-Output Study Tool API")

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "API is running"}
