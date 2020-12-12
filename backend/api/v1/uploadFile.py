from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from os import path


router = APIRouter()

class FileDetails(BaseModel):
    filePath: str

@router.post("/",
                responses={403: {"description": "Operation forbidden"}},)
async def uploadFile(fileDetails: FileDetails):
    if not path.exists(fileDetails.filePath):
        raise HTTPException(
            status_code=403, detail="Please send correct file path!"
        )

    return {"message": "Hello World"}
