import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from '../../core/HttpClient'
import { object } from 'yup';
import { grey } from '@material-ui/core/colors';

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
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: 'auto',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(
        "/api/v1/dashboard/task-details"
      )
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        console.log("Error aya hai bc")
      })
  }, [])

  return (
    <div className={classes.root}>
      {data.map((task, i) =>
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={i}
          >
            <Typography className={classes.heading}>
              {task.video_path.split(/(\\|\/)/g).pop()} {task.timestamp}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
        </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default Dashboard