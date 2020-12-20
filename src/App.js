import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import './index.css';
import NavBar from './components/NavBar';
import Home from './screens/Home';
import TryYOLO from './screens/TryYOLO'
import YoloSuccessPage from './screens/TryYOLO/SuccessPage'
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
              <Route exact path='/try-yolo/yolo-success' component={YoloSuccessPage}></Route> 
            </Switch> 
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
