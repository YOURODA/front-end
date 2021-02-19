import React, { useCallback } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider';
import Flare from "@material-ui/icons/Flare";
import debounce from "lodash.debounce";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function Brightness(props) {
  const { robot, setBrightnessValue, brightnessValue } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const debounceRedux = useCallback(
    debounce((e) => updateRedux(e), 1000),
    []
  );

  const updateRedux = (newValue) => {
    let newBrigthness = brightnessValue;
    newBrigthness[robot] = newValue;
    setBrightnessValue(newBrigthness);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    debounceRedux(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Brightness
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Flare />
        </Grid>
        <Grid item xs>
          <Slider
            min={0}
            max={255}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    brightnessValue: state.brightnessValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBrightnessValue: (brightnessValue) =>
      dispatch({ type: actionTypes.BRIGHTNESS_VALUE, brightnessValue }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Brightness);
