import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { createTheme } from "@mui/material/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import socketIo from "socket.io-client";
import CreateCor from "../CoreographyNew/CreateCor";
import APIServices from "../Services/APIServices";
import SpotifyAPIServices from "../Services/SpotifyAPIServices";
import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core";
import SpotifyFooterMakeCor from "../../Containers/SpotifyFooter/SpotifyFooterMakeCor";
import EditCorLocalStorage from "../Control/EditCorLocalStorage";
import GoSpotifySelection from "./GoSpotifySelection";
import SocketLogin from "../Socket/SocketLogin";
const useStyles = createTheme((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
// ,socket,isSmokeActive,setSmokeTemperature,durationStamps,setSocketIO,createUserPopUp,isUserAvailable
export const EditorNew = (props) => {
  const {
    setCreateUserPopup,
    durationStamps,
    isUserAvailable,
  } = props;
  const [goCoreography, setGoCoreography] = useState(false);
  const [odaNick, setOdaNick] = useState(null);
  const [continueCor, setContinueCor] = useState(false);
  const apiService = new APIServices();
  const spotifyAPIServices = new SpotifyAPIServices();
  if (!goCoreography) {
    setGoCoreography(true);
  }

  const isAvailableOdaNickRes = () => {
    apiService.isAvailableOdaNick(odaNick).then((response) => {
      if (response.data.odaNick === odaNick) setGoCoreography(true);
    });
  };

  const addOdaName = (e) => {
    setOdaNick(e.target.value);
  };
  const createUser = () => {
    setCreateUserPopup(true);
  };
  return (
    <Grid>
      {goCoreography === false && (
        <>
          {!isUserAvailable && (
            <Card>
              <CardHeader>
                <Typography variant="h5">Name to your ODABOX.</Typography>
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
        </>
      )}
      {goCoreography === true && durationStamps > 0 && (
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
          style={{ backgroundColor: "#001e3c", height: "100vh" }}
        >
          {!continueCor && (
            <EditCorLocalStorage setContinueCor={(e) => setContinueCor(e)} />
          )}
          <SocketLogin />
          <CreateCor />
        </Grid>
      )}
      {durationStamps === "00:00" && <GoSpotifySelection />}
      <SpotifyFooterMakeCor
        style={{
          fontFamily:
            "spotify-circular,Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif",
        }}
      ></SpotifyFooterMakeCor>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    durationStamps: state.durationStamps,
    odaUser: state.odaUser,
    socket: state.socket,
    createUserPopUp: state.createUserPopup,
    isUserAvailable: state.isUserAvailable,
    isSmokeActive: state.isSmokeActive,
    currentUser: state.current_user,
    currentTrackId: state.currentTrackId,
    currently_playing: state.currently_playing,
    odaName: state.odaName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSocketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
    setSmokeTemperature: (smokeTemperature) =>
      dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
    setCreateUserPopup: (createUserPopup) =>
      dispatch({ type: actionTypes.CREATE_USER_POPUP, createUserPopup }),
    setOdaUser: (odaUser) =>
      dispatch({ type: actionTypes.SET_ODAUSER, odaUser }),
    setOdaName: (odaName) =>
      dispatch({ type: actionTypes.SET_ODANAME, odaName }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorNew);
