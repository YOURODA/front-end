import React from "react";
import SilderInput from "./SilderInput";
import { Typography, Grid } from "@material-ui/core";
import { CirclePicker } from "react-color";
import Blinker from "./Blinker";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import Brightness from "./Brightness";

function RobotOptions(props) {
  const { robot } = props;
  const silderLabel = robot === "L" ? "LeLiRo" : "RiLiRo";
  const selectedColor = "#fff";

  const handleColorPWMValues = (event) => {
    const { colour } = props;
    if (robot === "L") {
      colour.lColor1 = Math.ceil(event.rgb.r).toString();
      colour.lColor2 = Math.ceil(event.rgb.g).toString();
      colour.lColor3 = Math.ceil(event.rgb.b).toString();
    } else {
      colour.rColor1 = Math.ceil(event.rgb.r).toString();
      colour.rColor2 = Math.ceil(event.rgb.g).toString();
      colour.rColor3 = Math.ceil(event.rgb.b).toString();
    }
    props.setColour(colour);
  };

  return (
    <div>
      <Grid item xs={6}>
        <SilderInput label={silderLabel} robot={robot} />
        <Typography variant="button">{`Select Color For ${silderLabel} Robot`}</Typography>
        <div style={{ float: "center" }}>
          <CirclePicker
            color={selectedColor}
            onChangeComplete={handleColorPWMValues}
          />
        </div>
        <Brightness robot={robot} />
        <Blinker robot={robot} />
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    colour: state.colour,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setColour: (colour) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR, colour }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RobotOptions);
