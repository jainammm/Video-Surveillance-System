import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

import HeaderPaper from '../../components/HeaderPaper';
import FileUpload from '../../components/FileUpload';

import classes from './TryYOLO.module.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
      <HeaderPaper handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <FileUpload />
        </div>
      </Modal>
    </div>
  )
}

export default TryYOLO