import React, { useState, useCallback } from 'react';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from 'react-input-slider';
import debounce from 'lodash.debounce';
// import SwapHorizRounded from '@material-ui/icons/SwapHorizRounded';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

function SilderInput(props) {
    const { rColor1, rColor2, rColor3, lColor1, lColor2, lColor3 } = props.colour
    const classes = useStyles();
    const [state, setState] = useState({ x: 10, y: 10 });
    const debounceRedux = useCallback(debounce(e => updateRedux(e), 1000), []);
    const backgroundColor = props.robot === "L" ? `rgb(${lColor1}, ${lColor2}, ${lColor3})` : `rgb(${rColor1}, ${rColor2}, ${rColor3})`

    const updateRedux = (event) => {
        const { robot } = props
        if (robot === "L") {
            props.setLeftHorValue((event.x) * 2.5)
            props.setLeftVerValue((event.y) * 2.5)
        }
        if (robot === "R") {
            props.setRightHorValue((event.x) * 2.5)
            props.setRightVerValue((event.y) * 2.5)
        }
    }

    const handleChange = (event) => {
        setState(event)
        debounceRedux(event)
    };

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                {props.label}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Slider
                        axis="xy"
                        styles={{
                            track: {
                                backgroundColor
                            },
                            active: {
                                backgroundColor
                            },
                            thumb: {
                                width: 40,
                                height: 40,
                                opacity: 0.8
                            }
                        }}
                        x={state.x}
                        y={state.y}
                        onChange={coordinates => handleChange(coordinates)} />
                </Grid>
            </Grid>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        colour: state.colour,
        //   colourNumber:state.colourNumber
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setLeftHorValue: leftHorValue => dispatch({ type: actionTypes.LEFT_HOR_VALUE, leftHorValue }),
        setLeftVerValue: leftVerValue => dispatch({ type: actionTypes.LEFT_VER_VALUE, leftVerValue }),
        setRightHorValue: rightHorValue => dispatch({ type: actionTypes.RIGHT_HOR_VALUE, rightHorValue }),
        setRightVerValue: rightVerValue => dispatch({ type: actionTypes.RIGHT_VER_VALUE, rightVerValue })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SilderInput);
