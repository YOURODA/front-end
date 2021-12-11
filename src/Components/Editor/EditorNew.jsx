import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import socketIo from "socket.io-client";
import CreateCor from "../CoreographyNew/CreateCor";
import Box from "@material-ui/core/Box";
import APIServices from "../Services/APIServices";
import {
    Typography,
    CardHeader,
    Card,
    CardContent,
    CardActions,
    Grid,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SpotifyFooterMakeCor from "../../Containers/SpotifyFooter/SpotifyFooterMakeCor";
import CreateUserPopUp from "../CoreographyNew/CreateUserPopUp";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
// ,socket,isSmokeActive,setSmokeTemperature,durationStamps,setSocketIO,createUserPopUp,isUserAvailable
export const EditorNew = (props) => {
    const { setCreateUserPopup, socket, isSmokeActive, setSmokeTemperature, durationStamps, setSocketIO, isUserAvailable, createUserPopUp, currentUser } = props;
    const classes = useStyles();
    const [goCoreography, setGoCoreography] = useState(false);
    const [seconds, setSeconds] = useState([]);
    const [odaNick, setOdaNick] = useState(null);

    const apiService = new APIServices();
    if ((!goCoreography)) {
        setGoCoreography(true);
    }
    const milisToMinutesAndSeconds = (mil) => {
        let minutes = Math.floor(mil / 60000);
        let seconds = ((mil % 60000) / 1000).toFixed(0);
        let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
        return secondsOfSum;
    };
    const askTemperature = () => {
        console.log("durationStamps", durationStamps)
        if (!currentUser == null) {
            console.log("socket", socket)
            socket.emit("askTemperature", isSmokeActive);
            socket.on("temperature", (data) => {
                console.log("temperature in the oda", data.temperatureToCelsius);
                setSmokeTemperature(data.temperatureToCelsius);
            });

        }
    };
    const isAvailableOdaNickRes = () => {
        apiService.isAvailableOdaNick(odaNick).then((response) => {
            if (response.data.odaNick === odaNick)
                setGoCoreography(true);
        });
    };
    let interval;
    let timeOfSum;
    let odaName;
    const socketio_url = "http://localhost:5000/";
    // const socketio_url = "https://your-oda-back-end.herokuapp.com/";
    useEffect(() => {
        if (currentUser && currentUser.email) {
            setInterval(() => askTemperature(), 8000);
            // this.timeOfSum = milisToMinutesAndSeconds(durationStamps);
            var connectionStrings = {
                "force new connection": true,
                reconnectionAttempts: "Infiniy",
                timeout: 10000,
                transports: ["websocket"],
            };
            odaName = { email: "eray.eroglu59@gmail.com" };

            let _socket = socketIo.connect(socketio_url, connectionStrings);
            _socket.emit("Odaya Katil", currentUser.email);
            setSocketIO(_socket);
        }
        return () => {
            clearInterval(interval);
            let _socket = socketIo.connect(socketio_url, connectionStrings);
            _socket.emit("Odaya Katil", currentUser.email);
            setSocketIO(_socket);
        };
    }, [currentUser]);

    const addOdaName = (e) => {
        setOdaNick(e.target.value)
    };
    const createUser = () => {
        setCreateUserPopup(true);
    };


    return (
        <Grid>
            {goCoreography === false && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    {!isUserAvailable && (
                        <Card>
                            <CardHeader>
                                <Typography variant="h5">
                                    Name to your ODABOX.
                  </Typography>
                            </CardHeader>
                            <CardContent>
                                <TextField
                                    onChange={(e) => addOdaName(e)}
                                    id="standard-search"
                                    label="Cihazınıza isim veriniz."
                                    type="search"
                                />
                            </CardContent>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Button
                                    onClick={isAvailableOdaNickRes}
                                    variant="contained"
                                    color="primary"
                                >
                                    Go Choreography
                  </Button>
                                <Button
                                    onClick={createUser}
                                    variant="contained"
                                    color="primary"
                                >
                                    Create User
                  </Button>
                            </CardActions>
                        </Card>
                    )}
                    {createUserPopUp && <CreateUserPopUp />}
                </Box>
            )}
            {goCoreography === true && durationStamps > 0 && (
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <CreateCor />
                </Grid>
            )}
            <Grid item lg={12} md={12} xl={12} xs={12}>
                <SpotifyFooterMakeCor
                    style={{
                        fontFamily:
                            "spotify-circular,Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif",
                    }}
                ></SpotifyFooterMakeCor>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        durationStamps: state.durationStamps,
        currentUser: state.current_user,
        socket: state.socket,
        createUserPopUp: state.createUserPopup,
        isUserAvailable: state.isUserAvailable,
        isSmokeActive: state.isSmokeActive,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSocketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
        setSmokeTemperature: (smokeTemperature) =>
            dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
        setCreateUserPopup: (createUserPopup) =>
            dispatch({ type: actionTypes.CREATE_USER_POPUP, createUserPopup })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorNew);
