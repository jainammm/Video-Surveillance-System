from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from os import path

from celery_worker.tasks import find_scenes_task
from storage.taskDBHelper import insert_start_task

router = APIRouter()


class FileDetails(BaseModel):
    filePath: str
    sceneDetect: Optional[bool] = False
    yolo: Optional[bool] = False
    textRecog: Optional[bool] = False

@router.post("/")
async def uploadFile(fileDetails: FileDetails,):
    if not path.exists(fileDetails.filePath):
        raise HTTPException(
            status_code=403, detail="Please send correct file path!"
        )
    db_id = insert_start_task(fileDetails.filePath)
    if(fileDetails.sceneDetect):
        find_scenes_task.delay(fileDetails.filePath, db_id, fileDetails.yolo, fileDetails.textRecog)

    return {"msg": "proccessing"}
