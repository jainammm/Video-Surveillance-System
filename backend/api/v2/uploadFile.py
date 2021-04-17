from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from os import path

from celery_worker.tasks import find_scenes_task
from storage.taskDBHelper import insert_start_task

router = APIRouter()


class FileDetails(BaseModel):
    filePath: str
    objectParameters : list
    textParameters: list

@router.post("/")
async def uploadFile(fileDetails: FileDetails,):
    if not path.exists(fileDetails.filePath):
        raise HTTPException(
            status_code=403, detail="Please send correct file path!"
        )

    if not fileDetails.objectParameters and not fileDetails.textParameters:
        raise HTTPException(
            status_code=403, detail="Please send non empty parameters!"
        )

    db_id = insert_start_task(fileDetails.filePath, fileDetails.objectParameters, fileDetails.textParameters)
    
    isYolo = False
    isTextRecog = False
    
    if fileDetails.objectParameters: 
        isYolo = True
    if fileDetails.textParameters:
        isTextRecog = True

    find_scenes_task.delay(fileDetails.filePath, db_id, isYolo, isTextRecog)

    return {"msg": "proccessing"}
