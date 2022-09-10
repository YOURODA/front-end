import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { ThemeProvider } from '@material-ui/styles';
import Routes from './Routes'
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#001e3c",
      dark: "#191414",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#ffffff",
      dark: "#191414",
      contrastText: "#000"
    }
  },
  typography: {
    useNextVariants: true,
    backgroundColor: "#ffffff",
    textColor: "#ffffff"
  }
});
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}


export default App;
