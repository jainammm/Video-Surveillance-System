from celery_worker.celery import app
from service.scene_detection.scene_detect import find_scenes
from service.yolo.yolo import yolo_images
from storage.taskDBHelper import (insert_scene_detection_result,
    insert_yolo_result)

import os

@app.task(track_started=True, bind=True)
def find_scenes_task(self, video_path, db_id):
    scenes, image_filenames, output_dir = find_scenes(
        video_path,
        output_dir=os.path.join('test_data', 'scenes-detection', self.request.id))

    insert_scene_detection_result(db_id, scenes, output_dir, image_filenames)
    yolo_task.delay(output_dir, db_id)
    return {"scene len": len(scenes), "output_dir": output_dir}

@app.task(track_started=True, bind=True)
def yolo_task(self, image_paths, db_id):
    total_objects = yolo_images(image_paths, os.path.join(image_paths, 'yolo'))
    insert_yolo_result(db_id, total_objects)
    return {"total objects": len(total_objects)}
