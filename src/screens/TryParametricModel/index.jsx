import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import HeaderPaper from '../../components/HeaderPaper';
import ModelDetail from '../../components/ModelDetail'
import FileUpload from '../../components/FileUpload';

import classes from './TryParametricModel.module.css';

import YoloHeaderImg from '../../assets/images/SceneDetectCardImg.gif';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function TryParametricModel() {

    useEffect(() => {
        document.title = 'Parametric Model | Video Surveillance System'
    });

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        texts: "",
        objects: ""
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <HeaderPaper name="Parametric Model" image={YoloHeaderImg} handleOpen={handleOpen} />
            <br></br>
            <FormControl component="fieldset">
                <FormLabel component="legend">Parameters to search</FormLabel>
                <FormGroup>
                    <TextField id="standard-basic" onChange={(e) => {
                        setState({ ...state, texts: e.target.value })
                    }} label="Texts" placeholder="text1,text2.." />
                    <br></br>
                    <TextField id="standard-basic" onChange={(e) => {
                        setState({ ...state, objects: e.target.value })
                    }} label="Objects" placeholder="people,car.." />
                </FormGroup>
            </FormControl>
            <ModelDetail detail="" />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <FileUpload parameters={state} sceneDetection={true} handleClose={handleClose} />
                </div>
            </Modal>
        </div>
    )
}

export default TryParametricModel