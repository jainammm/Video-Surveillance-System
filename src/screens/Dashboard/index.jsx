import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from '../../core/HttpClient'

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';

import DashboardResult from '../../components/DashboardResult'

import styles from './Dashboard.module.css';

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
  },
  button: {
    margin: 2
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


  const handleOpen = (model, task) => {
    console.log(task)
    setmodalBody(
      <DashboardResult task={{ model: model, task: task }} />
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
        <List className={styles.accordian} key={i}>
          <ListItem>
            <Typography className={classes.heading}>
              {task.video_path.split(/(\\|\/)/g).pop()}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.heading}>
              {
                Object.keys(task.models_result).map((k, v) => (
                  <Button variant="contained" size="small" color="primary"
                    className={classes.button}
                    onClick={() => { handleOpen(k, task.models_result[k]) }}>
                    {models[k]}
                  </Button>
                ))
              }
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.timestamp}>
              <Moment fromNow>{task.timestamp}</Moment>
            </Typography>
          </ListItem>
          <ListItem>
            {task.status === 'finished' ?
              <CheckCircleIcon className={styles.success_icon} /> :
              <CircularProgress />}
          </ListItem>
        </List>
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