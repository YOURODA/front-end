import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import { FormGroup, FormControlLabel, Switch, Grid } from "@material-ui/core";
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
  isOpen,
  settings,
  isShowSaveButton = true,
  isShowLiveTry = true,
  isShowConsole = true,
  isShowSmokeStatus = false,
}) => {
  const [isConsoleActive, setConsoleActive] = useState(false);
  const classes = useStyles();
  const apiServices = new APIService();

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
              label="Console"
            />
          )}

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
                        .myOdaOnlyEmail({ email: user.email })
                        .then((response) => {
                          if (
                            response.status === 200 &&
                            response.data.odas[0].localIp
                          ) {
                            localOdaIp = response.data.odas[0].localIp;
                            robotModel = response.data.odas[0].robotModel;
                          }
                          setIsLiveTry({
                            ...isLiveTry,
                            status: !isLiveTry.status,
                            localOdaIp,
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
          {/* {settings.isMakeCor ? <SaveLivePartyButton/> :<SaveCorButton />} */}
          {/* <SaveCorButton /> */}
        </FormGroup>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={4} xl>
          <img
            style={{
              height: "30px",
              width: "auto",
              paddingLeft: "5%",
            }}
            src={Logo}
            onClick={() => (window.location = "/party-selection")}
          />
        </Grid>
        <Grid item xs={4}>
          {isShowSmokeStatus && <SmokeStatus />}
        </Grid>
        {isOpen && (
          <Grid item xs={4}>
            <SwitchGroup />
          </Grid>
        )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarSettings);
