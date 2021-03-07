import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './index.css';
import NavBar from './components/NavBar';
import Dashboard from './screens/Dashboard';
import Home from './screens/Home';
import TryYOLO from './screens/TryYOLO'
import TrySceneDetection from './screens/TrySceneDetection'
import SuccessPage from './screens/SuccessPage'
import theme from './theme.js';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/try-yolo' component={TryYOLO}></Route>
            <Route exact path='/try-scene-detection' component={TrySceneDetection}></Route>
            <Route exact path='/upload-success' component={SuccessPage}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
