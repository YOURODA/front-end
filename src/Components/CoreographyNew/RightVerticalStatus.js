import React from 'react';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import SwapVertRounded from '@material-ui/icons/SwapVertRounded';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

function RightVerticalStatus() {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        this.props.setRightVerValue(newValue)
    };

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                RiLiRo Vertical
      </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <SwapVertRounded />
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
        setRightVerValue: rightVerValue => dispatch({ type: actionTypes.RIGHT_VER_VALUE, rightVerValue })
    };
};
export default connect(null, mapDispatchToProps)(RightVerticalStatus);
