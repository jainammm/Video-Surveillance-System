from celery_worker.celery import app
from service.scene_detection.scene_detect import find_scenes
from service.yolo.yolo import yolo_images

import os

@app.task(track_started=True)
def find_scenes_task(video_path):
    scenes, _, output_dir = find_scenes(video_path)
    yolo_task.delay(output_dir)
    return {"scene len": len(scenes), "output_dir": output_dir}

@app.task(track_started=True)
def yolo_task(image_paths):
    total_objects = yolo_images(image_paths, os.path.join(image_paths, 'yolo'))

    print(total_objects)

    return {"total objects": total_objects}
