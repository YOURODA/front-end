import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import Routes from './Routes'
import { createBrowserHistory } from 'history';
import withTracker from './withTracker'
import SpotifyFooter from './Containers/SpotifyFooter/SpotifyFooter'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
// import Editor from './Components/Editor/Editor'
// import OdaIdentify from './Components/OdaIdentify/OdaIdentify'
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
      // <MuiThemeProvider theme={theme}>
      //   <Router basename={process.env.REACT_APP_BASENAME || ''}>
      //     {Routes.map((route, index) => {
      //       return (
      //         <Route
      //           key={index}
      //           path={route.path}
      //           exact={route.exact}
      //           component={withTracker((props) => {
      //             return (
      //               <route.layout {...props}>
      //                 <route.component {...props} />
      //               </route.layout>

      //             );
      //           })}
      //         />
      //       );
      //     })}
      //   </Router>
      // </MuiThemeProvider>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
