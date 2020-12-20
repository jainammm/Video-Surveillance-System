import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from './HeaderPaper.module.css';

function HeaderPaper(props) {
  return (
    <Paper className={styles.paper}>
      <Grid container spacing={3} justify="center"
        alignItems="center" className={styles.logo}>
        <Grid item xs={4}>
          <h1 className={styles.headtext}>YOLO</h1>
          <Box>
            <Button variant="contained" size="small" className={styles.tryButton}
              onClick={props.handleOpen}>
              Try Now!
            </Button>
          </Box>
        </Grid>
        <Grid item xs={8}>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default HeaderPaper