import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import Routes from './Routes'
import { createBrowserHistory } from 'history';


const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: "#757ce8",
          main: "#1db954",
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
        useNextVariants: true
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
