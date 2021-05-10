import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

import HeaderPaper from '../../components/HeaderPaper';
import ModelDetail from '../../components/ModelDetail'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from '../../core/HttpClient'

import { useHistory } from "react-router-dom";

import classes from './TryFaceRecognition.module.css';

import FaceRecognition from '../../assets/images/face_recognition.png';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function TryFaceRecognition() {

    useEffect(() => {
        document.title = 'Parametric Model | Video Surveillance System'
    });

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [videoFile, setvideoFile] = React.useState('')
    const [faceFile, setfaceFile] = React.useState('')

    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (videoFile !== '' && faceFile !== '')
            axios.post("/api/v2/faceRecogAPI/", {
                filePath: videoFile,
                facePath: faceFile
            }).then((res) => {
                console.log(res)
                history.push('/upload-success')
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleVideoUpload = (e) => {
        let filePath = document.getElementById("videofile").files[0].path
        setvideoFile(filePath)
    }
    const handleFaceUpload = (e) => {
        let filePath = document.getElementById("facefile").files[0].path
        setfaceFile(filePath)
    }

    return (
        <div>
            <HeaderPaper name="Face Recognition" image={FaceRecognition} handleOpen={handleOpen} />
            <ModelDetail detail="" />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <Card className={classes.card}>
                        <h2 className={classes.Heading}>File Upload</h2>
                        <CardContent>

                            <form onSubmit={onSubmit}>
                                <div className={classes.Wrapper}>
                                    <h5 className={classes.h5text}>Video File</h5>
                                    <input
                                        style={{ color: 'white' }}
                                        id="videofile" name="videofile" type="file" accept="video/*" onChange={handleVideoUpload} />
                                </div>
                                <br />
                                <div className={classes.Wrapper}>
                                    <h5 className={classes.h5text}>Face File</h5>
                                    <input
                                        style={{ color: 'white' }}
                                        id="facefile" name="facefile" type="file" accept="image/*" onChange={handleFaceUpload} />
                                </div>
                                <br />
                                <div>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                    >
                                        UPLOAD
                                        </Button>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        className={classes.cancel}
                                        onClick={handleClose}
                                    >
                                        Cancel
                                        </Button>
                                </div>
                            </form>

                        </CardContent>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}

export default TryFaceRecognition