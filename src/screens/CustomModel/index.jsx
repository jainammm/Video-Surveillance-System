import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import HeaderPaper from '../../components/HeaderPaper';
import ModelDetail from '../../components/ModelDetail'
import FileUpload from '../../components/FileUpload';

import classes from './CustomModel.module.css';

import CustomModelHeaderImg from '../../assets/images/custom_model.png';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function TryCustomModel() {

    useEffect(() => {
        document.title = 'Custom Model | Video Surveillance System'
    });

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        scene_detect: true,
        yolo: false,
        text_detect: false,
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <HeaderPaper name="Custom Model" image={CustomModelHeaderImg} handleOpen={handleOpen} />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Models</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={state.scene_detect} onChange={handleChange} name="scene_detect" />}
                        label="Scene Detection"
                    />
                    <FormControlLabel
                        control={<Switch checked={state.yolo} onChange={handleChange} name="yolo" />}
                        label="Yolo"
                    />
                    <FormControlLabel
                        control={<Switch checked={state.text_detect} onChange={handleChange} name="text_detect" />}
                        label="Text detection"
                    />
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
                    <FileUpload sceneDetection={state.scene_detect}
                        yolo={state.yolo}
                        textDetection={state.text_detect}
                        handleClose={handleClose} />
                </div>
            </Modal>
        </div>
    )
}

export default TryCustomModel