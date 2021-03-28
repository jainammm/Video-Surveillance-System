import { useEffect } from 'react';

import ModelsOverviewCard from '../../components/ModelsOverviewCard'
import CarouselScreen from './CarouselScreen'

import YoloCardImg from '../../assets/images/YoloCardImg.png';
import SceneDetectCardImg from '../../assets/images/SceneDetectCardImg.gif';
import TextDetectCardImg from '../../assets/images/text_detection.jpeg';

function Home() {

  useEffect(() => {
    document.title = 'Home | Video Surveillance System'
  });

  return (
    <div>
      <CarouselScreen />
      <div className="container" style={{ marginTop: "24px", marginBottom: "24px" }} >
        <div className="row" style={{ marginTop: "24px", gap: "36px" }}>
          <ModelsOverviewCard title="Object Detection" image={YoloCardImg} link="/try-yolo"
            description="Identify and locate objects in the video using Computer Vision technique!" />
          <ModelsOverviewCard title="Scene Detection" image={SceneDetectCardImg} link='/try-scene-detection'
            description="Detect transitions between shots in a video for statistical analysis of videos!" />
          <ModelsOverviewCard title="Text Detection" image={TextDetectCardImg} link='/try-text-detection'
            description="Detect text appeared in a video!" />
        </div>
      </div>
    </div>
  )
}

export default Home