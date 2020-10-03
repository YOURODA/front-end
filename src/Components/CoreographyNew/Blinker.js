import React from 'react';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Flare from '@material-ui/icons/Flare';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

function Blinker(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log("setBrightnessValue,"+"150",newValue)
        props.setBlinkerValue(newValue)
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
                        value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                </Grid>
            </Grid>
        </div>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        setBlinkerValue: blinkerValue => dispatch({ type: actionTypes.BLINKER_VALUE, blinkerValue })
    };
};
export default connect(null, mapDispatchToProps)(Blinker);
