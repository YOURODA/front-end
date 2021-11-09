import React, { useState } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CirclePicker } from "react-color";

const CircleColour = (props) => {
  const { robot, songCor, selectedSecond, setSongCor, label } = props;
  const [value, setValue] = React.useState("#000000");
  const [selectTime, setSelectTime] = useState(0);

  if (!songCor || !songCor[selectedSecond] || !songCor[selectedSecond].robot) {
    return null;
  }

  if (
    selectedSecond !== selectTime &&
    songCor[selectedSecond].robot.colour[`${robot}hex`]
  ) {
    setSelectTime(selectedSecond);
    setValue(songCor[selectedSecond].robot.colour[`${robot}hex`]);
  }

  const handleColorPWMValues = (event) => {
    const newRobotColour = [...songCor];
    const colour = newRobotColour[selectedSecond].robot.colour;
    if (robot === "L") {
      colour.lColor1 = Math.ceil(event.rgb.r);
      colour.lColor2 = Math.ceil(event.rgb.g);
      colour.lColor3 = Math.ceil(event.rgb.b);
      colour[`${robot}hex`] = event.hex;
    } else {
      colour.rColor1 = Math.ceil(event.rgb.r);
      colour.rColor2 = Math.ceil(event.rgb.g);
      colour.rColor3 = Math.ceil(event.rgb.b);
      colour[`${robot}hex`] = event.hex;
    }
    newRobotColour[selectedSecond].robot.colour = colour;
    setSongCor(newRobotColour);
    setValue(event.hex);
    // props.setColour(colour);
  };

  return (
    <div>
      <Grid item lg={4} md={4} xl={4} xs={4}>
        <Typography variant="button">{`Select Color For ${label}`}</Typography>
      </Grid>
      <Grid item lg={4} md={4} xl={4} xs={4}>
        <div style={{ float: "center" }}>
          <CirclePicker
            color={value}
            onChangeComplete={handleColorPWMValues}
            colors={[
              "#FF0000",
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#FF00FF",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#0000FF",
              "#03a9f4",
              "#00FFFF",
              "#009688",
              "#00FF00",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
              "#FFFF00",
              "#ffc107",
              "#ff9800",
              "#ff5722",
              "#795548",
              "#000000",
              "#607d8b",
              "FFFFFF",
            ]}
          />
        </div>
      </Grid>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CircleColour);
