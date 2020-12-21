# Standard PySceneDetect imports:
from scenedetect import VideoManager
from scenedetect import SceneManager
from service.scene_detection.generate_image import generate_images

from service.yolo.yolo import yolo_images

# For content-aware scene detection:
from scenedetect.detectors import ContentDetector

import os

def find_scenes(video_path, output_dir='test_data/scenes-airport', threshold=30.0):
    # Create our video & scene managers, then add the detector.
    video_manager = VideoManager([video_path])
    scene_manager = SceneManager()
    scene_manager.add_detector(
        ContentDetector(threshold=threshold))

    # Base timestamp at frame 0 (required to obtain the scene list).
    base_timecode = video_manager.get_base_timecode()

    # Improve processing speed by downscaling before processing.
    video_manager.set_downscale_factor()

    # Start the video manager and perform the scene detection.
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    # Each returned scene is a tuple of the (start, end) timecode.
    scene_list = scene_manager.get_scene_list(base_timecode)

    image_filenames = generate_images(scene_list, video_manager, '$VIDEO_NAME-Scene-$SCENE_NUMBER-$IMAGE_NUMBER',
                         output_dir=output_dir)

    return scene_list, image_filenames, output_dir
