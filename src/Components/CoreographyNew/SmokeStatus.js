import React from 'react';
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
    return (
        <div >
            <Box width="100%" height="100%" >
                <LinearProgress variant="determinate" valueBuffer="59" style={{
                     webkitTransform: "rotate(270deg)",
                     mozTransform: "rotate(270deg)",
                     oTransform:" rotate(270deg)",
                     msTransform:" rotate(270deg)",
                     transform: "rotate(270deg)",
                     marginTop:"60%",
                     height: "8px"
                }}  {...props} />
            </Box>
                <Typography variant="body1" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
        </div>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function SmokeStatus(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={props.smokeTemperature/4.5} />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        smokeTemperature: state.smokeTemperature
    };
};
export default connect(mapStateToProps, null)(SmokeStatus);

