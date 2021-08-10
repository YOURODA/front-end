import React, { useState, useCallback } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import debounce from "lodash.debounce";

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
  },
}));

const marksX = [
  {
    value: 0,
    label: "front",
  },
  {
    value: 42,
    label: "rigth",
  },
  {
    value: 84,
    label: "back",
  },
  {
    value: 126,
    label: "left",
  },
  {
    value: 168,
    label: "r.front",
  },
  {
    value: 210,
    label: "r.right",
  },
  {
    value: 255,
    label: "r.back",
  },
];
const marksY = [
  {
    value: 0,
    label: "front",
  },
  {
    value: 128,
    label: "up",
  },
  {
    value: 255,
    label: "back",
  },
];

function SliderInput(props) {
  const { songCor, selectedSecond, setSongCor, robot } = props;
  const classes = useStyles();
  const [valueY, setValueY] = useState(0);
  const [valueX, setValueX] = useState(0);
  const [selectTime, setSelectTime] = useState(0);
  if (selectedSecond !== selectTime) {
    setSelectTime(selectedSecond);
    setValueX(songCor[selectedSecond].robot[`${robot}Hor`]);
    setValueY(songCor[selectedSecond].robot[`${robot}Ver`]);
  }
  const debounceRedux = useCallback(
    debounce(
      (value, position, robot, cor, time) =>
        updateRedux(value, position, robot, cor, time),
      100
    ),
    []
  );

  if (!songCor || !songCor[selectedSecond] || !songCor[selectedSecond].robot) {
    return null;
  }

  const updateRedux = (value, position, robot, cor, time) => {
    const newRobot = [...cor];
    const setRobot = `${robot}${position}`;
    newRobot[time].robot[setRobot] = value;

    setSongCor(newRobot);
  };

  const onChange = (value, positions, funcSetState) => {
    funcSetState(value);

    debounceRedux(value, positions, robot, songCor, selectTime);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Typography id="continuous-slider" gutterBottom>
            {props.label}
          </Typography>
          <Slider
            style={{
              height: "15em",
            }}
            min={0}
            max={255}
            track={true}
            defaultValue={valueY}
            marks={marksY}
            step={1}
            scale={(x) => x}
            orientation="vertical"
            value={valueY}
            onChange={(e, newValue) => {
              onChange(newValue, "Ver", setValueY);
              // setValueY(newValue);
              // debounceReduxY(newValue);
            }}
          />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Slider
            style={{
              width: "20em",
            }}
            min={0}
            max={255}
            track={true}
            defaultValue={valueX}
            marks={marksX}
            step={1}
            value={valueX}
            scale={(x) => x}
            onChange={(e, newValue) => {
              onChange(newValue, "Hor", setValueX);
              // setValueX(newValue);
              // debounceReduxX(newValue);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    colour: state.colour,
    songCor: state.songCor,
    selectedSecond: state.selectedSecond,
    //   colourNumber:state.colourNumber
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLeftHorValue: (leftHorValue) =>
      dispatch({ type: actionTypes.LEFT_HOR_VALUE, leftHorValue }),
    setLeftVerValue: (leftVerValue) =>
      dispatch({ type: actionTypes.LEFT_VER_VALUE, leftVerValue }),
    setRightHorValue: (rightHorValue) =>
      dispatch({ type: actionTypes.RIGHT_HOR_VALUE, rightHorValue }),
    setRightVerValue: (rightVerValue) =>
      dispatch({ type: actionTypes.RIGHT_VER_VALUE, rightVerValue }),
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SliderInput);
