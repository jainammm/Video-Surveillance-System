from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from os import path

from celery_worker.tasks import live_stream_task
from storage.taskDBHelper import insert_start_task_live_stream

router = APIRouter()


class FileDetails(BaseModel):
    facePath: str
    objectParameters: list
    textParameters: list
    email: str


@router.post("/")
async def liveStreamDetect(fileDetails: FileDetails,):
    if not path.exists(fileDetails.facePath):
        raise HTTPException(
            status_code=403, detail="Please send correct Face file path!"
        )

    db_id = insert_start_task_live_stream(
        fileDetails.facePath, fileDetails.objectParameters, fileDetails.textParameters)

    live_stream_task.delay(fileDetails.facePath, db_id,
                           fileDetails.objectParameters, fileDetails.textParameters, fileDetails.email)

    return {"msg": "proccessing"}
