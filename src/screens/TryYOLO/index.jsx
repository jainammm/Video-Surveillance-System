import {useEffect} from 'react';

import HeaderPaper from '../../components/HeaderPaper';
import FileUpload from '../../components/FileUpload';

function TryYOLO() {

  useEffect(() => {
    document.title = 'YOLO | Video Surveillance System'
  });

  return (
    <div>
      <HeaderPaper />
      <FileUpload />
    </div>
  )
}

export default TryYOLO