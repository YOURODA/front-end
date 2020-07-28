import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import Editor from '../../Components/Editor/Editor'
import { Link as RouterLink } from 'react-router-dom'
import CreateCor from '../CoreographyNew/CreateCor'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Grid,
} from '@material-ui/core';
import goParty from '../../images/goParty.png'
import makeParty from '../../images/makeParty.png'
import SpotifyFooter from "../../Containers/SpotifyFooter/SpotifyFooter"
import AllCoreographiesImage from "./AllCoreographiesImage";

const useStyles = theme => ({
    button: {
        // margin: theme.spacing(1)
    }
});
class PartSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { seconds } = this.state
        return (
            <Grid container spacing="4">
                <Grid item lg={4} sm={4} xl={4} xs={4}>
                    <AllCoreographiesImage />
                </Grid>
                <Grid item lg={4} sm={4} xl={4} xs={4}>

                </Grid>
                <Grid item lg={4} sm={4} xl={4} xs={4}>
                </Grid>
                <SpotifyFooter />
            </Grid>
        );
    }
}



const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        setScoketIO: socket =>
            dispatch({ type: actionTypes.SOCKET, socket }),
        setOnCloseCsvData: onCloseCsvData =>
            dispatch({ type: actionTypes.ON_CLOSE_CSV_DATA, onCloseCsvData }),
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(useStyles)(PartSelection));