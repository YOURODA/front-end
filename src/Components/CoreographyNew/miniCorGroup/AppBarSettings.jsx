import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { purple, red, blue } from "@material-ui/core/colors";
import APIService from "../../Services/APIServices";
import SaveCorButton from "../SaveCorButton";
import Logo from "../../../images/odaLogo.png";
import "./LogoSizing.css";
import Controller from "./Controller";
import SaveLivePartyButton from "../SaveLivePartyButton";
import SmokeStatus from "../SmokeStatus";
import { Redirect, withRouter } from "react-router-dom";
import { emptyCor } from "../../../utils/cor/emptyCor";

const RedSwitch = withStyles({
  switchBase: {
    color: red[300],
    "&$checked": {
      color: red[500],
    },
    "&$checked + $track": {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {},
})(Switch);
const LiveSwitch = withStyles({
  switchBase: {
    color: red[500],
    "&$checked": {
      color: red[300],
    },
    "&$checked + $track": {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {},
})(Switch);
const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    "&$checked": {
      color: blue[500],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  switchStyle: {
    display: "flex",
    justifyContent: "flex-end",
    color: "white",
  },
}));

export const AppBarSettings = ({
  isSmokeActive,
  isLiveTry,
  setIsLiveTry,
  setIsSmokeActive,
  user,
  settings,
  isShowSaveButton = false,
  isShowLiveTry = false,
  isShowConsole = false,
  isShowSmokeStatus = false,
  isShowHeat = false,
  isShowSmokeButton = false,
  isShowStopButton = false,


  setSecondsQueue,
  socket,
}) => {
  const [isConsoleActive, setConsoleActive] = useState(false);
  const [goPartySelection, setGoPartySelection] = useState(false);
  const classes = useStyles();
  const apiServices = new APIService();

  const stopButton = () => {
    setSecondsQueue({ liveCor: [], seconds: 0 });

    const corData = emptyCor(2);
    let stringCSV = JSON.stringify({ corData });
    const encodedString = {
      isStop: 1,
      base: stringCSV,
      // base: new Buffer(stringCSV).toString("base64"),
      time: 2,
      odaNameLocal: localStorage.getItem("odaName"),
    };
    socket.emit("corData", encodedString);
  };

  const runSmokeSocket = () => {
    console.log("run onlySmoke ");
    socket.emit("onlySmoke", {
      time: 5,
      smoke: 1,
      odaNameLocal: localStorage.getItem("odaName"),
    });
  };

  const SaveButton = () => {
    if (isShowSaveButton) {
      return (
        <>{settings.isMakeCor ? <SaveLivePartyButton /> : <SaveCorButton />}</>
      );
    }
    return null;
  };

  const SwitchGroup = () => {
    return (
      <>
        <FormGroup row className={classes.switchStyle}>
          {isShowConsole && (
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={isConsoleActive}
                  onChange={() => setConsoleActive(!isConsoleActive)}
                  color="primary"
                />
              }
              label="Joystick"
            />
          )}
          {isShowHeat && (
            <FormControlLabel
              control={
                <RedSwitch
                  checked={isSmokeActive}
                  onChange={() => setIsSmokeActive(!isSmokeActive)}
                  color="secondary"
                />
              }
              label="Heat"
            />
          )}
          {isShowLiveTry && (
            <FormControlLabel
              control={
                <LiveSwitch
                  checked={isLiveTry.status}
                  onChange={() => {
                    if (!isLiveTry.status) {
                      let localOdaIp = "";
                      let robotModel = "";
                      apiServices
                        .myOdaOnlyEmail({ email: "okan-_94@hotmail.com" }) // TODO acil
                        .then((response) => {
                          if (
                            response.status === 200 &&
                            response.data.odas[0].localIp
                          ) {
                            localOdaIp = localStorage.getItem("localIp");
                            robotModel = response.data.odas[0].robotModel;
                          }
                          setIsLiveTry({
                            ...isLiveTry,
                            status: !isLiveTry.status,
                            // localOdaIp,
                            robotModel,
                          });
                        });
                    } else {
                      setIsLiveTry({ ...isLiveTry, status: !isLiveTry.status });
                    }
                  }}
                  color="primary"
                />
              }
              label="Live Try"
            />
          )}

          {isConsoleActive && <Controller />}
          <SaveButton />
        </FormGroup>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container>
        {goPartySelection && <Redirect to="/party-selection" />}
        <Grid item xs={2} md={2} lg={4} xl={4} >
          <img
            style={{
              height: "30px",
              width: "auto",
              paddingLeft: "5%",
            }}
            src={Logo}
            onClick={() => setGoPartySelection(true)}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={4} xl={4} >
          <div style={{ display: "flex" }}>
            <Grid item lg={5} md={5} xl={5} xs={5}>
              {isShowSmokeStatus && <SmokeStatus />}
            </Grid>
            <Grid item lg={1} md={1} xl={1} xs={1} />
            <Grid item lg={2} md={2} xl={2} xs={2}>
              {isShowSmokeButton && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => runSmokeSocket()}
                >
                  Smoke
                </Button>
              )}
            </Grid>
            <Grid item lg={2} md={2} xl={2} xs={2} />
            <Grid item lg={2} md={2} xl={2} xs={2}>
              {isShowStopButton && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => stopButton()}
                >
                  Stop
                </Button>
              )}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6} md={6} lg={4} xl={4} style={{
          paddingRight: "1%",
        }}>
          <SwitchGroup />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.socket,
  isSmokeActive: state.isSmokeActive,
  isLiveTry: state.isLiveTry,
  user: state.current_user,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLiveTry: (isLiveTry) =>
      dispatch({ type: actionTypes.IS_LIVE_TRY, isLiveTry }),
    setIsSmokeActive: (isSmokeActive) =>
      dispatch({ type: actionTypes.IS_SMOKE_ACTIVE, isSmokeActive }),
    setSecondsQueue: (secondsQueue) =>
      dispatch({ type: actionTypes.SET_SECOUNDS_QUEUE, secondsQueue }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppBarSettings)
);
