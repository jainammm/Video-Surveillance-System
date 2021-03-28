import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from '../../core/HttpClient'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from '@material-ui/core/Modal';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Dashboard.module.css';
import { Switch } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '24px auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
  }
}));

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

function Dashboard() {
  const classes = useStyles();
  const [data, setData] = useState([])

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [modalBody, setmodalBody] = useState('')

  useEffect(() => {
    document.title = 'Dashboard | Video Surveillance System'
    axios
      .get(
        "/api/v1/dashboard/task-details"
      )
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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

  const models = {
    scene_detection: "Scene Detection",
    yolo: "Yolo",
    text_recog: "Text Recognition"
  }

  return (
    <div className={classes.root}>
      {data.map((task, i) =>
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={i}
          >
            <List className={styles.accordian}>
              <ListItem>
                <Typography className={classes.heading}>
                  {task.video_path.split(/(\\|\/)/g).pop()}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className={classes.heading}>
                  {
                    Object.keys(task.models_result).map((k, v) => (
                      <p><b>{models[k]}</b></p>
                    ))
                  }
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className={classes.timestamp}>
                  {task.timestamp}
                </Typography>
              </ListItem>
              <ListItem>
                {task.status === 'finished' ?
                  <CheckCircleIcon className={styles.success_icon} /> :
                  <CircularProgress />}
              </ListItem>
            </List>
          </AccordionSummary>
          <AccordionDetails>
            {task.status === "finished" ?
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  {
                    task.models_result.yolo && (
                      <div>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Total Objects</TableCell>
                            <TableCell align="right">Objects</TableCell>
                            <TableCell align="right">View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {task.models_result.yolo.total_objects.map((row, i) => (
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
                    task.models_result.text_recog && (
                      <div>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Total Texts</TableCell>
                            <TableCell align="right">Texts</TableCell>
                            <TableCell align="right">View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {task.models_result.text_recog.total_text_result.map((row, i) => (
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

                </Table>
              </TableContainer> : <p>processing...</p>}
          </AccordionDetails>
        </Accordion>
      )}

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
  );
}

export default Dashboard