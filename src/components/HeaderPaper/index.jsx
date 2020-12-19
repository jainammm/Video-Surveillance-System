import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import styles from './HeaderPaper.module.css';

function HeaderPaper(props) {
  return (
    <Paper className={styles.paper}>
      <Box>
        YOLO
      </Box>
    </Paper>
  )
}

export default HeaderPaper