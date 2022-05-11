import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { FormControlLabel, Checkbox, Grid } from "@material-ui/core";
import color from "@material-ui/core/colors/amber";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);


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
      <FormControlLabel
        style={{ marginTop: "12%", paddingLeft: "10%" }}
        control={
          <Checkbox
            checked={songCor[selectedSecond].smoke}
            onChange={() => handleChangeSmoke()}
            name="checkSmoke"
            color="primary"
          />
        }
        label={<WhiteTextTypography >Smoke</WhiteTextTypography>}
      />
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
