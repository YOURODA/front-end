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
  CardActions,
  Grid,
  CardActionArea,
} from '@material-ui/core';
import goParty from '../../images/goParty.png'
import makeParty from '../../images/createParty.png'
// import PlayParty from "../MyPartyList/PlayCoreography";

const useStyles = theme => ({
  cardImage:{
    height:'80%'
  }

});
class PartySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goPlayCoreography: false,
      makeParty: false
    };
  }
  playCoreography = () => {
    this.setState({ goPlayCoreography: true })
  }
  makePartyChecker = () => {
    this.setState({ makeParty: true })

  }

  render() {
    const { classes } = this.props;
    if (this.state.goPlayCoreography) {
      window.location = "/play-coreography"
    }
    if (this.state.makeParty) {
      window.location = "/make-coreography"
    }
    return (
      <Grid container spacing="0">
        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <Card className={classes.cardImage}>
            <CardActionArea>
              <img onClick={this.playCoreography} src={goParty} />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <Card className={classes.cardImage}>
            <CardActionArea>
              <img onClick={this.makePartyChecker} src={makeParty} />
            </CardActionArea>
          </Card>
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