from fastapi import APIRouter

from api.v2 import uploadFile
from api.v2 import faceRecogAPI

api_router = APIRouter()
api_router.include_router(uploadFile.router, prefix="/uploadFile", tags=["uploadFile"])
api_router.include_router(faceRecogAPI.router, prefix="/faceRecogAPI", tags=["faceRecogAPI"])
