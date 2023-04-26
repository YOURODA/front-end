import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as actionTypes from "../../store/actions/actionTypes";
import SpotifyFooter from "../../Containers/SpotifyFooter/SpotifyFooter";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import APIService from "../Services/APIServices";
import PlayChoreographiesTable from "./PlayChoreographiesTable/index";
import CorListDrawer from "./Drawer";
import AppBarSettings from "../../Components/CoreographyNew/miniCorGroup/AppBarSettings";
import { withRouter } from "react-router-dom";

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  height: "auto",
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
  let interval;
  const apiService = new APIService();
  const { isSmokeActive, setSmokeTemperature, setList } = props;
  const [goCoreography, setGoCoreography] = useState(false);
  const [odaNick, setOdaNick] = useState(null);
  if (!goCoreography) {
    setGoCoreography(true);
  }
  const isAvailableOdaNickRes = () => {
    apiService.isAvailableOdaNick(odaNick).then((response) => {
      if (response.data.odaNick === odaNick) setGoCoreography(true);
    });
  };

  return (
    <Grid container style={{ backgroundColor: "#001e3c", height: "100%" }}>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <AppBarSettings isShowSmokeStatus isShowStopButton isShowHeat isShowSmokeButton />
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
};
const mapStateToProps = (state) => {
  return {
    isSmokeActive: state.isSmokeActive,
    currentUser: state.current_user,
    currently_playing: state.currently_playing,
    user: state.current_user,
    odaName: state.odaName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSmokeTemperature: (smokeTemperature) =>
      dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
    setList: (list) => dispatch({ type: actionTypes.SET_LIST, list }),
    setSelectedTrackIds: (selectedTrackIds) =>
      dispatch({ type: actionTypes.SET_SELECTED_TRACK_IDS, selectedTrackIds }),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlayChoreographies)
);
