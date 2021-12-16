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
import { purple } from "@material-ui/core/colors";
import APIService from "../../Services/APIServices";
import SaveCorButton from "../SaveCorButton"
import Logo from '../../../images/odaLogo.png';
import './LogoSizing.css'
import Controller from "./Controller"


const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
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
  switchStyle:{
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export const AppBarSettings = ({
  isSmokeActive,
  isLiveTry,
  setIsLiveTry,
  setIsSmokeActive,
  user,
}) => {
  const [isConsoleActive, setConsoleActive] = useState(false);
  const classes = useStyles();
  const apiServices = new APIService();


  const SwitchGroup = () => {
    return (
      <FormGroup row   className={classes.switchStyle} >
                <FormControlLabel
          control={
            <PurpleSwitch
              checked={isConsoleActive}
              onChange={() => setConsoleActive(!isConsoleActive)}
              color="primary"
            />
          }
          label="Console"
        />
        <FormControlLabel
          control={
            <PurpleSwitch
              checked={isSmokeActive}
              onChange={() => setIsSmokeActive(!isSmokeActive)}
              color="secondary"
            />
          }
          label="Heat"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isLiveTry.status}
              onChange={() => {
                if (!isLiveTry.status) {
                  let localOdaIp = "";
                  apiServices
                    .myOdaOnlyEmail({ email: user.email })
                    .then((response) => {
                      if (
                        response.status === 200 &&
                        response.data.odas[0].localIp
                      ) {
                        localOdaIp = response.data.odas[0].localIp;
                      }
                      setIsLiveTry({
                        ...isLiveTry,
                        status: !isLiveTry.status,
                        localOdaIp,
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
        {isConsoleActive && <Controller/>}
        <SaveCorButton/>
      </FormGroup>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container >
      <Grid item xs={4}>
      <img style={{height: "30px",
    width: "auto", paddingLeft:"5%"}} src={Logo} />
      </Grid>
      <Grid item xs={4}/>
        <Grid item xs={4}>
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
