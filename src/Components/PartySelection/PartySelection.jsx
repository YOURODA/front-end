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
import makeParty from '../../images/makeParty.png'
// import PlayParty from "../MyPartyList/PlayCoreography";

const useStyles = theme => ({

});
class PartySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goPlayCoreography: false
    };
  }
  playCoreography = () => {
    this.setState({ goPlayCoreography: true })
  }

  render() {
    if (this.state.goPlayCoreography) {
      window.location = "/play-coreography"
    }
    const { seconds } = this.state
    return (
      <Grid container spacing="4">
        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <Card>
            <CardActionArea>
              <CardContent>
                <img src={goParty} />
              </CardContent>
              <CardActions>
                <Button onClick={this.playCoreography} size="small" color="primary">
                  Go Party
               </Button>
                <Button size="small" color="primary">
                  Learn More
              </Button>
              </CardActions>
            </CardActionArea>

          </Card>
          {/* <img src={goParty} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6}>

          <img src={makeParty} /> */}
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