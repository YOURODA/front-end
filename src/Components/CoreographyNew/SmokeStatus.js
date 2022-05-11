import React from 'react';
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { styled } from '@mui/material/styles';
import { red } from "@material-ui/core/colors";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#66B2FF',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: red[500],
    },
}));
function LinearProgressWithLabel(props) {
    return (
        <>
            <BorderLinearProgress variant="determinate" valueBuffer="59" style={{
                //  webkitTransform: "rotate(270deg)",
                //  mozTransform: "rotate(270deg)",
                //  oTransform:" rotate(270deg)",
                //  msTransform:" rotate(270deg)",
                //  transform: "rotate(270deg)",
                marginTop: "6%",
                height: "8px"
            }}  {...props} />
            <Typography >{`${Math.round(
                props.value,
            )}%`}</Typography>
        </>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
        width: '100%',
        color: "#6F7E8C"
    },
});

function SmokeStatus(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={props.smokeTemperature / 4.5} />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        smokeTemperature: state.smokeTemperature
    };
};
export default connect(mapStateToProps, null)(SmokeStatus);

