import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import './index.css';
import Home from './screens/Home';
import theme from './theme.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
