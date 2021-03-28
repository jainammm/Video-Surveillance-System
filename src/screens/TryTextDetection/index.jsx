import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

import HeaderPaper from '../../components/HeaderPaper';
import ModelDetail from '../../components/ModelDetail'
import FileUpload from '../../components/FileUpload';

import classes from './TryTextDetection.module.css';

import TextHeaderImg from '../../assets/images/text_detection.jpeg';

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

function TryTextDetection() {

    useEffect(() => {
        document.title = 'Text Detection | Video Surveillance System'
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
            <HeaderPaper name="Text Detection" image={TextHeaderImg} handleOpen={handleOpen} />
            <ModelDetail detail="" />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <FileUpload sceneDetection={true} yolo={false} textDetection={true} />
                </div>
            </Modal>
        </div>
    )
}

export default TryTextDetection