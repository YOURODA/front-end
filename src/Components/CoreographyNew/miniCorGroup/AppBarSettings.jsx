import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { purple, red, blue } from "@material-ui/core/colors";
import APIService from "../../Services/APIServices";
import SaveCorButton from "../SaveCorButton"
import Logo from '../../../images/odaLogo.png';
import './LogoSizing.css'
import Controller from "./Controller"
import { Redirect, withRouter } from 'react-router-dom';

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
    color: "white"
  }
}));

export const AppBarSettings = ({
  isSmokeActive,
  isLiveTry,
  setIsLiveTry,
  setIsSmokeActive,
  user,
  isOpen
}) => {
  const [isConsoleActive, setConsoleActive] = useState(false);
  const [goPartySelection, setGoPartySelection] = useState(false);
  const classes = useStyles();
  const apiServices = new APIService();


  const SwitchGroup = () => {
    return (
      <FormGroup row className={classes.switchStyle} >
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
                        localOdaIp = localStorage.getItem('localIp');
                        robotModel = response.data.odas[0].robotModel;
                      }
                      setIsLiveTry({
                        ...isLiveTry,
                        status: !isLiveTry.status,
                        localOdaIp,
                        robotModel
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
        {isConsoleActive && <Controller />}
        <SaveCorButton />
      </FormGroup>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container >
        {goPartySelection &&
          <Redirect to="/party-selection" />
        }
        <Grid item xs={4}>
          <img style={{
            height: "30px",
            width: "auto", paddingLeft: "5%"
          }} src={Logo} onClick={() => setGoPartySelection(true)} />
        </Grid>
        <Grid item xs={4} />
        {isOpen &&
          <Grid item xs={4}>
            <SwitchGroup />
          </Grid>}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.socket,
  isSmokeActive: state.isSmokeActive,
  isLiveTry: state.isLiveTry,
  user: state.current_user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLiveTry: (isLiveTry) =>
      dispatch({ type: actionTypes.IS_LIVE_TRY, isLiveTry }),
    setIsSmokeActive: (isSmokeActive) =>
      dispatch({ type: actionTypes.IS_SMOKE_ACTIVE, isSmokeActive }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((AppBarSettings)));
