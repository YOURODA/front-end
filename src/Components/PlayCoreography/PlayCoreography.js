import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import SpotifyFooter from '../../Containers/SpotifyFooter/SpotifyFooter'
import Editor from '../Editor/Editor'
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
import AllCoreographiesSelect from "./AllCoreographies/AllCoreographiesSelect";
import MyCoreographiesSelect from "./MyCoreographies/MyCoreographiesSelect";
import HitCoreographiesSelect from "./HitCoreographies/HitCoreographiesSelect";
import MyStartsSelect from "./MyStars/MyStartsSelect";
import MyPartyList from "./MyPartyList/MyPartyList";
import Last100 from "./Last100/Last100";
const useStyles = theme => ({
    button: {
        // margin: theme.spacing(1)
    }
});
class PlayCoreography extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { seconds } = this.state
        return (
            <div>
                <Grid container spacing="10">
                    <Grid item lg={12} sm={12} xl={12} xs={12} />
                    <Grid item lg={2} sm={2} xl={2} xs={2} />
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <AllCoreographiesSelect />
                    </Grid>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <MyCoreographiesSelect />
                    </Grid>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <HitCoreographiesSelect />
                    </Grid>
                    <Grid item lg={2} sm={2} xl={2} xs={2} />
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <MyStartsSelect />
                    </Grid>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <MyPartyList />
                    </Grid>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <Last100 />
                    </Grid>
                    <SpotifyFooter />
                </Grid>
            </div>
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
)(withStyles(useStyles)(PlayCoreography));