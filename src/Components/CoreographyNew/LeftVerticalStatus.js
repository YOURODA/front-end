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

function LeftVerticalStatus() {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
        this.props.setLeftVerValue(newValue)
    };

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                LeLiRo Vertical
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
        setLeftVerValue: leftVerValue => dispatch({ type: actionTypes.LEFT_VER_VALUE, leftVerValue })
    };
};
export default connect(null, mapDispatchToProps)(LeftVerticalStatus);
