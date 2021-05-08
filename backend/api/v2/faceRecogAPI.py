from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from os import path

from celery_worker.tasks import face_recognition
from storage.taskDBHelper import insert_start_task

router = APIRouter()


class FileAndFaceDetails(BaseModel):
    filePath: str
    facePath : str

@router.post("/")
async def faceRecogAPI(fileAndFaceDetails: FileAndFaceDetails,):
    if not path.exists(fileAndFaceDetails.filePath) or \
        not path.exists(fileAndFaceDetails.facePath):
        raise HTTPException(
            status_code=403, detail="Please send correct file path!"
        )

    db_id = insert_start_task(fileAndFaceDetails.filePath)
    face_recognition.delay(fileAndFaceDetails.filePath, fileAndFaceDetails.facePath, db_id)

    return {"msg": "proccessing"}
