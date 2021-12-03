import React from "react";
import SliderInput from "./SliderInput";
import { Typography, Grid } from "@material-ui/core";
import CircleColour from "./CircleColor";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import OneLine from "./OneLine";

function RobotOptions(props) {
  const { robot } = props;
  const sliderLabel = robot === "L" ? "Left Robot" : "Right Robot";

  return (
    <Grid item tem lg={3} md={3} xl={3} xs={3}>
      <Grid item lg={4} md={4} xl={4} xs={4}>
        <SliderInput label={sliderLabel} robot={robot} />
      </Grid>
      <CircleColour robot={robot} label={sliderLabel} />
      <Grid item lg={4} md={4} xl={4} xs={4}>
        <OneLine robot={robot} option="Brightness" />
      </Grid>
      <Grid item lg={4} md={4} xl={4} xs={4}>
        <OneLine robot={robot} option="Blinker" />
      </Grid>
      <Grid item lg={4} md={4} xl={4} xs={4}>
        <OneLine robot={robot} option="Speed" />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    colour: state.colour,
    songCor: state.songCor,
    selectedSecond: state.selectedSecond,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setColour: (colour) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR, colour }),
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RobotOptions);
