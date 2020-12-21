from storage.db import db

from datetime import datetime

task_table = db.table('tasks')


def insert_start_task(video_path):
    return task_table.insert({
        'status': 'started',
        'video_path': video_path,
        'timestamp': str(datetime.now()),
        'models_result': {}
    })


def insert_scene_detection_result(id, scenes, output_dir, image_filenames):
    task_table.update({
        'models_result': {
            'scene_detection':
            {
                'output_dir': output_dir,
                'image_filenames': image_filenames
            }
        }
    }, doc_ids=[id])


def insert_yolo_result(id, total_objects):
    old_result = task_table.get(doc_id=id)
    print(old_result)
    old_result['models_result']['yolo'] = {
        'total_objects' : total_objects
    }
    task_table.update({
        'models_result': old_result['models_result']
    }, doc_ids=[id])

def get_all_tasks():
    return task_table.all()