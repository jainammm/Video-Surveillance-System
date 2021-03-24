from celery_worker.celery import app
from service.scene_detection.scene_detect import find_scenes
from service.yolo.yolo import yolo_images
from service.text_recognition.text_recog import east_text_recog_images
from storage.taskDBHelper import (insert_scene_detection_result,
    insert_yolo_result, finish_task)

import os

@app.task(track_started=True, bind=True)
def find_scenes_task(self, video_path, db_id, isYolo, isTextRecog):
    scenes, image_filenames, output_dir = find_scenes(
        video_path,
        output_dir=os.path.join('test_data', self.request.id, 'scenes-detection'))

    insert_scene_detection_result(db_id, scenes, output_dir, image_filenames)
    if(isYolo):
        yolo_task.delay(output_dir, db_id)
    if(isTextRecog):
        text_recognition_task.delay(output_dir, db_id)
    
    finish_DB_task.delay(db_id)
    return {"scene len": len(scenes), "output_dir": output_dir}

@app.task(track_started=True, bind=True)
def yolo_task(self, image_paths, db_id):
    total_objects = yolo_images(image_paths, os.path.join(os.path.dirname(image_paths), 'yolo'))
    insert_yolo_result(db_id, total_objects)
    return {"total objects": len(total_objects)}

@app.task(track_started=True, bind=True)
def text_recognition_task(self, image_paths, db_id):
    allTextResults = east_text_recog_images(image_paths, os.path.join(os.path.dirname(image_paths), 'text_recognition'))
    print(allTextResults)

@app.task(track_started=True, bind=True)
def finish_DB_task(self, db_id):
    finish_task(db_id)