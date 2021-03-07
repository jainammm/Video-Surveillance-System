import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import VideocamIcon from '@material-ui/icons/Videocam';

import classes from './NavBar.module.css';

function NavBar() {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <VideocamIcon />
            <Link to='/' className={classes.link}>
              <Typography variant="h6" className={classes.title}>
                Video Surveillance System
                        </Typography>
            </Link>
          </IconButton>

          <div className={classes.menu}>
            <Link to='/dashboard' className={classes.link}>
              <Button color="inherit">Dashboard</Button>
            </Link>
            <Button color="inherit">Contact</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
