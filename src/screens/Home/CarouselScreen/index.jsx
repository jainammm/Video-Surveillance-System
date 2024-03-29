import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

import SceneCarouselImg from '../../../assets/images/carousel/scene-detect.jpeg';
import YoloCarouselImg from '../../../assets/images/carousel/real_time_object_detection.jpg';
import TextCarouselImg from '../../../assets/images/carousel/text-detection.jpg';

function CarouselScreen() {
  return (
    <Carousel style={{ marginTop: '24px' }}>
      <Carousel.Item>
        <center>
          <Link to='/try-scene-detection'>
            <img
              style={{ height: 400 }}
              className='d-block'
              src={SceneCarouselImg}
              alt='Scene Detection'
            />
          </Link>
        </center>
        <Carousel.Caption>
          <h3>Scene Detection</h3>
          <p>
            View all the scenes in the video using our Scene Detection Model.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <center>
          <Link to='/try-yolo'>
            <img
              style={{ height: 400 }}
              className='d-block'
              src={YoloCarouselImg}
              alt='Yolo Object Detection'
            />
          </Link>
        </center>
        <Carousel.Caption>
          <h3>Yolo Object Detection</h3>
          <p>Detect objects from a video using YOLO algorithm.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <center>
          <Link to='/try-text-detection'>
            <img
              style={{ height: 400 }}
              className='d-block'
              src={TextCarouselImg}
              alt='Text Recognition'
            />
          </Link>
        </center>
        <Carousel.Caption>
          <h3>Text Recognition</h3>
          <p>Detect text in an image using East and Tesseract Models. </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselScreen;
