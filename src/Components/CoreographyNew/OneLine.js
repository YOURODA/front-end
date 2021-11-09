import React, { useCallback, useState,useEffect } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Flare from "@material-ui/icons/Flare";
import debounce from "lodash.debounce";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const OneLine = (props) => {
  const { robot, songCor, selectedSecond, setSongCor, option } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selectTime, setSelectTime] = useState(0);
  const debounceRedux = useCallback(
    debounce((e, time,songCor) => updateRedux(e, time,songCor), 10),
    []
  );

  if (!songCor || !songCor[selectedSecond] || !songCor[selectedSecond].robot) {
    return null;
  }

  if (selectedSecond !== selectTime) {
    setSelectTime(selectedSecond);
    setValue(songCor[selectedSecond].robot[`${robot}${option}`]);
  }

  const updateRedux = (newValue, time,songCor) => {
    const newRobot = [...songCor];
    newRobot[time].robot[`${robot}${option}`] = newValue;
    setSongCor(newRobot);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    debounceRedux(newValue, selectTime, songCor);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {option}
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
            value={value}
            aria-labelledby="continuous-slider"
          />
        </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(OneLine);
