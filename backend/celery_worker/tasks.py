from celery_worker.celery import app
from service.scene_detection.scene_detect import find_scenes

@app.task(track_started=True)
def find_scenes_worker(video_path):
    scenes, image_files = find_scenes(video_path)
    return scenes, image_files