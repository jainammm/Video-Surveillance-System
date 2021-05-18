import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

import HeaderPaper from '../../components/HeaderPaper';
import ModelDetail from '../../components/ModelDetail'
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from '../../core/HttpClient'

import { useHistory } from "react-router-dom";

import classes from './TryLiveDetection.module.css';

import LiveStream from '../../assets/images/live_stream.png';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function TryLiveDetection() {

    useEffect(() => {
        document.title = 'Live Scene Detection | Video Surveillance System'
    });

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [faceFile, setfaceFile] = React.useState('')
    const [email, setEmail] = React.useState('')

    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (faceFile !== '')
            axios.post("/api/v2/liveStreamAPI/", {
                facePath: faceFile,
                email: email,
                objectParameters: [],
                textParameters: []
            }).then((res) => {
                console.log(res)
                history.push('/upload-success')
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleFaceUpload = (e) => {
        let filePath = document.getElementById("facefile").files[0].path
        setfaceFile(filePath)
    }

    return (
        <div>
            <HeaderPaper name="Live Scene Detection" image={LiveStream} handleOpen={handleOpen} />
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
                                    <h5 className={classes.h5text}>Face File</h5>
                                    <input
                                        id="facefile" name="facefile" type="file" accept="image/*" onChange={handleFaceUpload} />
                                    <br /><br />
                                    <TextField id="standard-basic" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} label="Email" type="email" />
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

export default TryLiveDetection