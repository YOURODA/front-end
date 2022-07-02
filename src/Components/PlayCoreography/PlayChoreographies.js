import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as actionTypes from "../../store/actions/actionTypes";
import SpotifyFooter from "../../Containers/SpotifyFooter/SpotifyFooter";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import socketIo from "socket.io-client";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import APIService from "../Services/APIServices";
import PlayChoreographiesTable from "./PlayChoreographiesTable/index";
import CorListDrawer from "./Drawer";
import AppBarSettings from "../../Components/CoreographyNew/miniCorGroup/AppBarSettings";
import { withRouter } from 'react-router-dom';

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
export const PlayChoreographies = (props) => {
    const socketio_url = localStorage.getItem('localIp') + ':8080/odaName'
    let interval;
    let odaNameLocal = localStorage.getItem("odaName");
    const apiService = new APIService();
    const {
        isSmokeActive,
        setSmokeTemperature,
        setSocketIO,
        setList
    } = props;
    const [goCoreography, setGoCoreography] = useState(false);
    const [odaNick, setOdaNick] = useState(null);
    if (!goCoreography) {
        setGoCoreography(true);
    }
    // const getUserCorListAll = async () => {
    //     await apiService
    //         .getUserCorListAll()
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log("Create New List", response.data);
    //                 setList(response.data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("sentReviews Err", err);
    //         });
    // }
    // const joinRoom = async (_socket) => {
    //     console.log('joine geldi');
    //     _socket.emit("join", { name: "eray" });
    //     await _socket.on('join', (data) => {
    //         console.log("data.msg: ", data.msg)
    //         interval = data.msg
    //     });
    // }
    // const askTemperature = async (_socket) => {
    //     console.log('asktemperatureeee')
    //     if (interval !== null) {
    //         console.log("interval", interval)
    //         _socket.emit("askTemperature", { isSmokeActive, odaNameLocal });
    //         await _socket.on("temperature", (data) => {
    //             console.log("temperature in the oda", data.temperature);
    //             setSmokeTemperature(data.temperature);
    //         });
    //     }
    // };

    const isAvailableOdaNickRes = () => {
        apiService.isAvailableOdaNick(odaNick).then((response) => {
            if (response.data.odaNick === odaNick) setGoCoreography(true);
        });
    };

    // useEffect(() => {
    //     getUserCorListAll();
    //     const _socket = socketIo(`${socketio_url}`);
    //     setSocketIO(_socket);
    //     joinRoom(_socket);
    //     interval = setInterval(() => askTemperature(_socket), 10000);
    //     return () => {
    //         _socket.close();
    //     };
    // }, [setSocketIO]);
    return (
        <Grid container style={{ backgroundColor: '#001e3c', height: "100%" }} >
            <Grid item lg={12} md={12} xl={12} xs={12}>
                <AppBarSettings isShowSmokeStatus isShowStopButton isShowHeat />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
                <CorListDrawer />
            </Grid>
            <Main>
                <PlayChoreographiesTable />
            </Main>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <SpotifyFooter
                        style={{
                            fontFamily:
                                "spotify-circular,Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif",
                        }}
                    ></SpotifyFooter>
                </CssBaseline>
            </ThemeProvider>
        </Grid>
    );
}
const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        isSmokeActive: state.isSmokeActive,
        currentUser: state.current_user,
        currently_playing: state.currently_playing,
        user: state.current_user,
        odaName: state.odaName
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSocketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
        setSmokeTemperature: (smokeTemperature) =>
            dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
        setList: (list) => dispatch({ type: actionTypes.SET_LIST, list }),
        setSelectedTrackIds: selectedTrackIds =>
            dispatch({ type: actionTypes.SET_SELECTED_TRACK_IDS, selectedTrackIds })

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((PlayChoreographies)));
