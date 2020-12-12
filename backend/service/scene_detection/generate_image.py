import os
import logging
from string import Template
import math

from scenedetect.frame_timecode import FrameTimecode
from scenedetect.platform import tqdm
import numpy as np
import cv2
from scenedetect.platform import get_and_create_path

def generate_images(scene_list, video_manager,
                        image_name_template='$VIDEO_NAME-Scene-$SCENE_NUMBER-$IMAGE_NUMBER',
                        output_dir=None):
    # type: (List[Tuple[FrameTimecode, FrameTimecode]) -> None

    if not scene_list:
        return

    num_images = 2
    image_frame_margin = 0
    image_extension = 'jpg'

    # Reset video manager and downscale factor.
    video_paths = video_manager.get_video_paths()
    video_name = os.path.basename(video_paths[0])

    video_manager.release()
    video_manager.reset()
    video_manager.set_downscale_factor(1)
    video_manager.start()

    # Setup flags and init progress bar if available.
    completed = True
    logging.info('Generating output images (%d per scene)...', num_images)
    progress_bar = None
    progress_bar = tqdm(
            total=len(scene_list) * num_images, unit='images')

    filename_template = Template(image_name_template)


    scene_num_format = '%0'
    scene_num_format += str(max(3, math.floor(math.log(len(scene_list), 10)) + 1)) + 'd'
    image_num_format = '%0'
    image_num_format += str(math.floor(math.log(num_images, 10)) + 2) + 'd'

    timecode_list = dict()

    fps = scene_list[0][0].framerate

    timecode_list = [
        [
            FrameTimecode(int(f), fps=fps) for f in [
                # middle frames
                a[len(a)//2] if (0 < j < num_images-1) or num_images == 1

                # first frame
                else min(a[0] + image_frame_margin, a[-1]) if j == 0

                # last frame
                else max(a[-1] - image_frame_margin, a[0])

                # for each evenly-split array of frames in the scene list
                for j, a in enumerate(np.array_split(r, num_images))
            ]
        ]
        for i, r in enumerate([
            # pad ranges to number of images
            r
            if 1+r[-1]-r[0] >= num_images
            else list(r) + [r[-1]] * (num_images - len(r))
            # create range of frames in scene
            for r in (
                range(start.get_frames(), end.get_frames())
                # for each scene in scene list
                for start, end in scene_list
                )
        ])
    ]

    image_filenames = {i: [] for i in range(len(timecode_list))}

    for i, scene_timecodes in enumerate(timecode_list):
        for j, image_timecode in enumerate(scene_timecodes):
            video_manager.seek(image_timecode)
            video_manager.grab()
            ret_val, frame_im = video_manager.retrieve()
            if ret_val:
                file_path = '%s.%s' % (filename_template.safe_substitute(
                    VIDEO_NAME=video_name,
                    SCENE_NUMBER=scene_num_format % (i + 1),
                    IMAGE_NUMBER=image_num_format % (j + 1),
                    FRAME_NUMBER=image_timecode.get_frames()),
                                        image_extension)
                image_filenames[i].append(file_path)
                cv2.imwrite(
                    get_and_create_path(
                        file_path,
                        output_dir),
                    frame_im)
            else:
                completed = False
                break
            if progress_bar:
                progress_bar.update(1)

    if not completed:
        logging.error('Could not generate all output images.')

    return image_filenames