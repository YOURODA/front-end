import React from 'react';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import SwapHorizRounded from '@material-ui/icons/SwapHorizRounded';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

function LeftHorizontalStatus(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
        props.setLeftHorValue(newValue)
    };

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                LeLiRo Horizontal
      </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <SwapHorizRounded />
                </Grid>
                <Grid item xs>
                    <Slider
                        min={0}
                        max={255}
                        value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                </Grid>
            </Grid>
        </div>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        setLeftHorValue: leftHorValue => dispatch({ type: actionTypes.LEFT_HOR_VALUE, leftHorValue })
    };
};
export default connect(null, mapDispatchToProps)(LeftHorizontalStatus);
