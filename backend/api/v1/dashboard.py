from fastapi import APIRouter
from storage.taskDBHelper import get_all_tasks

router = APIRouter()

@router.get("/task-details")
async def getTaskDetails():

    return get_all_tasks()
