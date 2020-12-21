from fastapi import APIRouter

from api.v1 import uploadFile
from api.v1 import dashboard

api_router = APIRouter()
api_router.include_router(uploadFile.router, prefix="/uploadFile", tags=["uploadFile"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])