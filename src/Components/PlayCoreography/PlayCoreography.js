import React, { Component } from "react";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as actionTypes from "../../store/actions/actionTypes";
import SpotifyFooter from "../../Containers/SpotifyFooter/SpotifyFooter";
// import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import socketIo from "socket.io-client";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import APIService from "../Services/APIServices";
import ListTab from "./ListTab/ListTab";
import PlayChoreographiesTable from "./PlayChoreographiesTable/index";
import CorListDrawer from "./Drawer";
import MuiAppBar from '@mui/material/AppBar';
import AppBarSettings from "../../Components/CoreographyNew/miniCorGroup/AppBarSettings";

// const drawerWidth = 200;
const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  height: "auto"
}));
// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
//   width: `calc(100% - ${drawerWidth}px)`,
//   marginLeft: `${drawerWidth}px`,
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.easeOut,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
// }));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#001e3c",
      dark: "#191414",
      // contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#ffffff",
      dark: "#191414",
      contrastText: "#000",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#001e3c",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class PlayCoreography extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  askTemperature = () => {
    console.log("test");
    const {
      // isSmokeActive,
      socket,
      setSmokeTemperature,
    } = this.props;
    // if (isSmokeActive) {
    socket.emit("askTemperature", { isSmokeActive: false });
    socket.on("temperature", (data) => {
      console.log("temperature in the oda", data.temperatureToCelsius);
      setSmokeTemperature(data.temperatureToCelsius);
    });
    // }
  };

  componentDidMount() {
    this.interval = setInterval(() => this.askTemperature(), 10000);
    const connectionStrings = {
      "force new connection": true,
      reconnectionAttempts: "Infiniy",
      timeout: 10000,
      transports: ["websocket"],
    };
    // var socketio_url = "https://your-oda-back-end.herokuapp.com";
    // this.odaName = { name: "Corlu" };
    const socketio_url = "http://localhost:5001/";
    this.odaName = { email: "eray.eroglu59@gmail.com" };
    let _socket = socketIo.connect(socketio_url, connectionStrings);
    _socket.emit("Odaya Katil", this.odaName);
    this.props.setScoketIO(_socket);
    console.log("odaname", this.odaName);
    const apiServices = new APIService();

    apiServices
      .getUserCorListAll()
      .then((response) => {
        if (response.status === 200) {
          console.log("Create New List", response.data);
          this.props.setList(response.data);
        }
      })
      .catch((err) => {
        console.log("sentReviews Err", err);
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // const { userId } = this.props;

    return (
      <Grid container style={{ backgroundColor: '#001e3c', height: "100%" }} >
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <AppBarSettings isOpen={false} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <CorListDrawer />
        </Grid>
        <Main>
          <PlayChoreographiesTable />
        </Main>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    socket: state.socket,
    playChoreographyScreen: state.playChoreographyScreen
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSmokeTemperature: (smokeTemperature) =>
      dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
    setScoketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
    setOnCloseCsvData: (onCloseCsvData) =>
      dispatch({ type: actionTypes.ON_CLOSE_CSV_DATA, onCloseCsvData }),
    setList: (list) => dispatch({ type: actionTypes.SET_LIST, list }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayCoreography);
