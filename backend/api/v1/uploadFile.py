from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from os import path
from service.scene_detection.scene_detect import find_scenes

router = APIRouter()

class FileDetails(BaseModel):
    filePath: str

@router.post("/")
async def uploadFile(fileDetails: FileDetails):
    if not path.exists(fileDetails.filePath):
        raise HTTPException(
            status_code=403, detail="Please send correct file path!"
        )

    scenes, image_files = find_scenes(fileDetails.filePath)

    return {"scenes": scenes, "images": image_files }
