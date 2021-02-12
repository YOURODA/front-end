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
    label: "front",
  },
  {
    value: 210,
    label: "right",
  },
  {
    value: 255,
    label: "back",
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

function SilderInput(props) {
  const { rColor1, rColor2, rColor3, lColor1, lColor2, lColor3 } = props.colour;
  const classes = useStyles();
  const [valueY, setValueY] = useState(0);
  const [valueX, setValueX] = useState(0);
  const debounceReduxX = useCallback(
    debounce((e) => updateReduxX(e), 1000),
    []
  );
  const debounceReduxY = useCallback(
    debounce((e) => updateReduxY(e), 1000),
    []
  );
  const backgroundColor =
    props.robot === "L"
      ? `rgb(${lColor1}, ${lColor2}, ${lColor3})`
      : `rgb(${rColor1}, ${rColor2}, ${rColor3})`;

  const updateReduxX = (event) => {
    const { robot } = props;
    console.log("updateReduxX", event);
    if (robot === "L") {
      props.setLeftHorValue(event);
    }
    if (robot === "R") {
      props.setRightHorValue(event);
    }
  };
  const updateReduxY = (event) => {
    const { robot } = props;
    console.log("updateReduxy", event);
    if (robot === "L") {
      props.setLeftVerValue(event);
    }
    if (robot === "R") {
      props.setRightVerValue(event);
    }
  };

  const setValue = {};
  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {props.label}
      </Typography>
      
        
          <Slider
            min={0}
            max={255}
            track={true}
            defaultValue={valueY}
            marks={marksY}
            step={1}
            scale={(x) => x}
            // orientation="vertical"
            onChange={(e, newValue) => {
              setValueY(newValue);
              debounceReduxY(newValue);
            }}
          />

        <Slider
          min={0}
          max={255}
          track={true}
          defaultValue={valueX}
          marks={marksX}
          step={1}
          scale={(x) => x}
          onChange={(e, newValue) => {
            setValueX(newValue);
            debounceReduxX(newValue);
          }}
        />
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
