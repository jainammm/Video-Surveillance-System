from fastapi import APIRouter

from api.v2 import uploadFile

api_router = APIRouter()
api_router.include_router(uploadFile.router, prefix="/uploadFile", tags=["uploadFile"])
