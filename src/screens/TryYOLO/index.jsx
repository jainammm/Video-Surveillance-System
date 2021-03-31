import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

import HeaderPaper from '../../components/HeaderPaper';
import ModelDetail from '../../components/ModelDetail'
import FileUpload from '../../components/FileUpload';

import classes from './TryYOLO.module.css';

import YoloHeaderImg from '../../assets/images/Yolo.png';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function TryYOLO() {

  useEffect(() => {
    document.title = 'YOLO | Video Surveillance System'
  });

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <HeaderPaper name="YOLO" image={YoloHeaderImg} handleOpen={handleOpen} />
      <ModelDetail detail="" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <FileUpload sceneDetection={true} yolo={true} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  )
}

export default TryYOLO