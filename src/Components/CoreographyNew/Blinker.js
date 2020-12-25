import React, { useCallback } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/lab/Slider';
import Flare from "@material-ui/icons/Flare";
import debounce from "lodash.debounce";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function Blinker(props) {
  const { robot, setBlinkerValue, blinkerValue } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const debounceRedux = useCallback(
    debounce((e) => updateRedux(e), 1000),
    []
  );

  const updateRedux = (newValue) => {
    let newBrigthness = blinkerValue;
    newBrigthness[robot] = newValue;
    setBlinkerValue(newBrigthness);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    debounceRedux(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Blinker
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
    blinkerValue: state.blinkerValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBlinkerValue: (blinkerValue) =>
      dispatch({ type: actionTypes.BLINKER_VALUE, blinkerValue }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Blinker);
