import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import {
  Card,
  Grid,
  CardActionArea,
} from '@material-ui/core';
import goParty from '../../images/goParty.png'
import makeParty from '../../images/createParty.png'
import APIServices from "../Services/APIServices";
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = theme => ({
});
class PartySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goPlayCoreography: false,
      makeParty: false,
      dimensions: null,
      ipList: []
    };
    this.apiService = new APIServices();

  }
  componentDidMount() {
    this.apiService.loginRaspi(this.setState, this.state.ipList);
    console.log()
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
  }

  playCoreography = () => {
    this.setState({ goPlayCoreography: true })
  }
  makePartyChecker = () => {
    this.setState({ makeParty: true })
  }
  renderContent() {
    const { dimensions } = this.state;
    console.log("this.state.ipList", this.state.ipList)
    return (
      <Grid container spacing="0">
        <Grid item lg={6} sm={6} xl={6} xs={6} style={{ height: dimensions.height, width: dimensions.width }}>
          <Card>
            <CardActionArea>
              <div style={{ width: dimensions.width }}>
                <img onClick={this.playCoreography} src={goParty} />
              </div>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} style={{ height: dimensions.height, width: dimensions.width }}>
          <Card >
            <CardActionArea>
              <div style={{ width: dimensions.width }}>
                <img onClick={this.makePartyChecker} src={makeParty} />
              </div>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    );
  }
  render() {
    const { dimensions } = this.state;
    const { classes } = this.props;
    if (this.state.goPlayCoreography) {
      window.location = "/go-party"
    }
    if (this.state.makeParty) {
      window.location = "/create-party"
    }
    return (
      <div ref={el => (this.container = el)}>
        {dimensions && this.renderContent()}
      </div>
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