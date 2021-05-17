# Standard PySceneDetect imports:
from scenedetect import VideoManager
from scenedetect import SceneManager

# For content-aware scene detection:
from scenedetect.detectors import ContentDetector

import cv2
import datetime
import threading


class LiveStreamSceneDetect:
    def __init__(self, task_id, image_callback):
        self.task_id = task_id
        self.image_callback = image_callback

    def find_scenes(self, video_path=0, threshold=10.0):
        # Create our video & scene managers, then add the detector.
        video_manager = VideoManager([video_path])
        scene_manager = SceneManager()
        scene_manager.add_detector(
            ContentDetector(threshold=threshold))

        # Improve processing speed by downscaling before processing.
        video_manager.set_downscale_factor()

        # Start the video manager and perform the scene detection.
        video_manager.start()

        scene_manager.detect_scenes(
            frame_source=video_manager, callback=self.scene_callback)

    def scene_callback(self, image_ndarray, frame_num: int):
        print(image_ndarray.shape)
        image_name = "test_data/{}/cam_{}.png".format(
            self.task_id, str(datetime.datetime.now()))
        print(image_name)
        res = cv2.imwrite(
            image_name, image_ndarray)
        print(res)

        thr = threading.Thread(target=self.image_callback, args=(image_name,))
        thr.start()
