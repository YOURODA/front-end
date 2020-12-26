import React, { useState, useCallback } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "react-input-slider";
import debounce from "lodash.debounce";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function SilderInput(props) {
  const { rColor1, rColor2, rColor3, lColor1, lColor2, lColor3 } = props.colour;
  const classes = useStyles();
  const [state, setState] = useState({ x: 175, y: 255 });
  const debounceRedux = useCallback(
    debounce((e) => updateRedux(e), 1000),
    []
  );
  const backgroundColor =
    props.robot === "L"
      ? `rgb(${lColor1}, ${lColor2}, ${lColor3})`
      : `rgb(${rColor1}, ${rColor2}, ${rColor3})`;

  const updateRedux = (event) => {
    const { robot } = props;

    if (robot === "L") {
      props.setLeftHorValue(event.x);
      props.setLeftVerValue(event.y);
    }
    if (robot === "R") {
      props.setRightHorValue(event.x);
      props.setRightVerValue(event.y);
    }
  };

  const handleChange = (event) => {
    setState(event);
    debounceRedux(event);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {props.label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            xmax={255}
            ymax={255}
            axis="xy"
            styles={{
              track: {
                borderRadius: "25px",
                backgroundColor,
              },
              active: {
                borderRadius: "25px",
                backgroundColor,
              },
              thumb: {
                width: 40,
                height: 40,
                opacity: 0.8,
              },
            }}
            x={state.x}
            y={state.y}
            onChange={(coordinates) => handleChange(coordinates)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    colour: state.colour,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SilderInput);
