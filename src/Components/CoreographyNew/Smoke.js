import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { FormControlLabel, Checkbox, Grid } from "@material-ui/core";
import SmokeStatus from "./SmokeStatus";

const Smoke = ({ songCor, selectedSecond, setSongCor }) => {
  if (!songCor || !songCor[selectedSecond]) {
    return null;
  }
  const handleChangeSmoke = () => {
    const newRobot = [...songCor];
    newRobot[selectedSecond].smoke = !songCor[selectedSecond].smoke;
    setSongCor(newRobot);
  };

  return (
    <>
      <Grid item xs={11}>
        <SmokeStatus />
      </Grid>
      <Grid item xs={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={songCor[selectedSecond].smoke}
              onChange={() => handleChangeSmoke()}
              name="checkSmoke"
              color="primary"
            />
          }
          label="Smoke"
        />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    songCor: state.songCor,
    selectedSecond: state.selectedSecond,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Smoke);
