import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    timestamp: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: 'auto',
    },
    tableCell: {
        cursor: 'pointer',
        color: 'blue'
    },
    paper: {
        position: 'absolute',
        padding: '50px',
    },
    table: {
        height: '100%'
    }
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function DashboardResult({ task }) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [modalBody, setmodalBody] = useState('')

    const images = require.context('../../../backend', true);

    const handleOpen = (image_path) => {
        let imgsrc = images('./' + image_path)
        setmodalBody(
            <img width="700px" src={imgsrc.default} alt='' />
        )
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    {
                        task.model == 'yolo' && (
                            <div>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.head}>Image</TableCell>
                                        <TableCell align="right" className={classes.head}>Total Objects</TableCell>
                                        <TableCell align="right" className={classes.head}>Objects</TableCell>
                                        <TableCell align="right" className={classes.head}>View</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {task.task?.total_objects.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {row.image_path.split(/(\\|\/)/g).pop()}
                                            </TableCell>
                                            <TableCell align="right">{row.objects.length}</TableCell>
                                            <TableCell align="right">{row.objects.map((ob, ob_i) =>
                                                <Chip key={ob_i} label={`${ob.object} ${ob.confidence.toFixed(2)}`} />
                                            )}</TableCell>
                                            <TableCell className={classes.tableCell} onClick={() => {
                                                handleOpen(row.image_path)
                                            }} align="right"><VisibilityIcon /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </div>)
                    }

                    {
                        task.model == 'text_recog' && (
                            <div>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.head}>Image</TableCell>
                                        <TableCell align="right" className={classes.head}>Total Texts</TableCell>
                                        <TableCell align="right" className={classes.head}>Texts</TableCell>
                                        <TableCell align="right" className={classes.head}>View</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {task.task?.total_text_result.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {row.image_path.split(/(\\|\/)/g).pop()}
                                            </TableCell>
                                            <TableCell align="right">{row.text.length}</TableCell>
                                            <TableCell align="right">{row.text.map((ob, ob_i) =>
                                                <Chip key={ob_i} label={`${ob}`} />
                                            )}</TableCell>
                                            <TableCell className={classes.tableCell} onClick={() => {
                                                handleOpen(row.image_path)
                                            }} align="right"><VisibilityIcon /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </div>)
                    }

                    {
                        task.model == 'scene_detection' && (
                            <div>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.head}>Image</TableCell>
                                        <TableCell align="right" className={classes.head}>View</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(task.task?.image_filenames).map((k, v) => (

                                            task.task?.image_filenames[k].map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell component="th" scope="row">
                                                        {row.split(/(\\|\/)/g).pop()}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} onClick={() => {
                                                        handleOpen(row)
                                                    }} align="right"><VisibilityIcon /></TableCell>
                                                </TableRow>
                                            ))

                                        ))
                                    }
                                </TableBody>
                            </div>)
                    }

                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper style={modalStyle} className={classes.paper}>
                    {modalBody}
                </Paper>
            </Modal>
        </div>
    )
}
