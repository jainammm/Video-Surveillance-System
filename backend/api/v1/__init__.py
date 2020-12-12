from fastapi import APIRouter

from api.v1 import uploadFile

api_router = APIRouter()
api_router.include_router(uploadFile.router, prefix="/uploadFile", tags=["uploadFile"])