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

def finish_task(id):
    task_table.update({
        'status': 'finished'
    }, doc_ids=[id])

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
    old_result['models_result']['yolo'] = {
        'total_objects' : total_objects
    }
    task_table.update({
        'models_result': old_result['models_result']
    }, doc_ids=[id])

def insert_text_recog_result(id, total_text_results):
    old_result = task_table.get(doc_id=id)
    old_result['models_result']['text_recog'] = {
        'total_text_result' : total_text_results
    }
    task_table.update({
        'models_result': old_result['models_result']
    }, doc_ids=[id])

def get_all_tasks():
    return task_table.all()