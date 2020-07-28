import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import Editor from '../../Components/Editor/Editor'
import { Link as RouterLink } from 'react-router-dom'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
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
import AllCoreographiesImage from "../PlayParty/AllCoreographiesImage";
import PlayParty from "../PlayParty/PlayParty";

const useStyles = theme => ({

});
class PartySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { seconds } = this.state
    return (
      <Grid container spacing="4">
        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <RouterLink component={PlayParty} to="/play-coreography">
            <img src={goParty} />
          </RouterLink>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <RouterLink component={Editor} to="/make-coreography">
            <img src={makeParty} />
          </RouterLink>
        </Grid>
      </Grid>
    );
  }
}



const mapStateToProps = state => {
  return {
    durationStamps: state.durationStamps,
    currently_playing: state.currently_playing,
    csvData: state.csvData,
    user: state.current_user,
    onCloseCsvData: state.onCloseCsvData,
    corData: state.corData,
    socket: state.socket
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
)(withStyles(useStyles)(PartySelection));