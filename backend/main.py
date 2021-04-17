import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1 import api_router as api_router1
from api.v2 import api_router as api_router2

from core import settings

from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title=settings.PROJECT_NAME, debug=True)

app.include_router(api_router1, prefix=settings.API_V1_STR)
app.include_router(api_router2, prefix=settings.API_V2_STR)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)