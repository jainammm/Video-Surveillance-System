from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from os import path

from celery_worker.tasks import find_scenes_task, yolo_task

router = APIRouter()


class FileDetails(BaseModel):
    filePath: str


@router.post("/")
async def uploadFile(fileDetails: FileDetails,):
    if not path.exists(fileDetails.filePath):
        raise HTTPException(
            status_code=403, detail="Please send correct file path!"
        )
    find_scenes_task.delay(fileDetails.filePath)

    return {"msg": "proccessing"}
