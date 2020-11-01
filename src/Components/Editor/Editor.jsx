import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { Grid } from "grommet";
import { makeStyles } from "@material-ui/styles";
import { toaster } from "evergreen-ui";
import Button from "@material-ui/core/Button";
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import Icon from "@material-ui/core/Icon";
import ExportCSV from "../Coreography/ExportCSV/ExportCSV";
import socketIo from "socket.io-client";
import CorDraw from "../Coreography/CorDraw";
import CreateCor from "../CoreographyNew/CreateCor";
import Box from "@material-ui/core/Box";
import { Typography, CardHeader, Card, CardContent, CardActions } from "@material-ui/core";
import SmokeStatus from "../CoreographyNew/SmokeStatus";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SpotifyFooterMakeCor from "../../Containers/SpotifyFooter/SpotifyFooterMakeCor";
import SecondList from "../CoreographyNew/SecondList";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "Koreografi.csv",
      excelData: [],
      initialTime: null,
      goCoreography: false,
      finishTime: null,
      seconds: [],
      smokeTemperature: null,
      socket: null,
      data: [],
      onCloseEveryThing: [
        {
          rRobotsSpeed1: 40,
          rRobotsSpeed2: 40,
          lRobotsSpeed1: 40,
          lRobotsSpeed2: 40,
          rColor1: "0",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "0",
          lColor3: "0",
          blinker: 0,
          smokeHeater: 0,
          smoke: 0
        }
      ],
    };
  }
  onClickAddOdaName = () => {
    let userData = {
      email: this.props.user.email,
      odaName: this.odaName
    };
    axios({
      url: "http://localhost:5000/odaIdentify",
      method: "POST",
      data: userData
    }).then(response => {
      console.log("response: ", response.data.odaName)
      if (response.data.odaName) {
        return (this.setState({ goCoreography: true }))
      }
    });
    this.setState({ goCoreography: true })
  }
  addOdaName(e) {
    this.odaName = e.target.value;
  }
  changeStart(e) {
    this.setState({
      initialTime: e.target.value
    });
  }
  changeEnd(e) {
    this.setState({
      finishTime: e.target.value
    });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.askTemperature(), 10000);
    this.timeOfSum = this.milisToMinutesAndSeconds(this.props.durationStamps);
    console.log("time of sum:", this.timeOfSum)
    var connectionStrings = {
      "force new connection": true,
      "reconnectionAttempts": "Infiniy",
      "timeout": 10000,
      "transports": ["websocket"]
    };
    var socketio_url = 'http://localhost:5000'
    this.odaName = { name: "Corlu" }
    this.state.socket = socketIo.connect(socketio_url, connectionStrings);
    this.state.socket.emit("Odaya Katil", this.odaName);
    this.props.setScoketIO(this.state.socket);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData = result => {
    this.setState({ data: result.data });
  };
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }
  onCsvExcel = () => {
    const dataForExcel = [];
    if (this.props.csvData.length !== 0) {
      this.props.csvData.forEach(element => {
        dataForExcel.push({
          "A": element.startDate,
          "B": element.rRobotsSpeed1,
          "C": element.rRobotsSpeed2,
          "D": element.lRobotsSpeed1,
          "E": element.lRobotsSpeed2,
          "F": element.rColor1,
          "G": element.rColor2,
          "H": element.rColor3,
          "I": element.lColor2,
          "J": element.lColor3,
          "K": element.blinker,
          "L": element.smokeHeater,
          "M": element.smoke,
        });
      });
      // dataForExcel.push({
      //   "Şarkı Süresi": this.milisToMinutesAndSeconds(
      //     this.props.durationStamps
      //   ),
      //   "Çalan Şarkı İsmi": this.props.currently_playing
      // });
      this.setState({
        excelData: dataForExcel
      });
    }
    let stringCSV = JSON.stringify(this.state.excelData);
    const encodedString = { "base": new Buffer(stringCSV).toString('base64'), "time": this.milisToMinutesAndSeconds(this.props.durationStamps) }
    this.props.socket.emit(
      "corData",
      encodedString
    );
  };
  onCloseEveryComponent = () => {
    this.props.csvData.forEach(element => {
      return element.startDate = 0,
        element.rRobotsSpeed1 = 40,
        element.rRobotsSpeed2 = 40,
        element.lRobotsSpeed1 = 40,
        element.lRobotsSpeed2 = 40,
        element.rColor1 = "0",
        element.rColor2 = "0",
        element.rColor3 = "0",
        element.lColor2 = "0",
        element.lColor3 = "0",
        element.blinker = 0,
        element.smokeHeater = 0,
        element.smoke = 0
    })
    console.log(this.state.csvData)
  }

  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };
  askTemperature = () => {
    console.log("59")
    this.props.socket.emit(
      "askTemperature",
      this.temperatureToCelsius
    );
    this.props.socket.on(
      "temperature", data => {
        console.log(data.temperatureToCelsius)
        this.props.setSmokeTemperature(data.temperatureToCelsius)
      });
    console.log(this.state.smokeTemperature)
  }

  render() {
    const { seconds } = this.state
    return (
      <Grid container>
        {/* {!this.timeOfSum &&
          <Box
            display="flex" 
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Card>
              <CardHeader>
                <Typography variant="h5"> Cihazınıza isim veriniz.</Typography>
              </CardHeader>
              <CardContent>
                <TextField onChange={e => this.addOdaName(e)}
                  id="standard-search"
                  label="Cihazınıza isim veriniz."
                  type="search" />
              </CardContent>
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button onClick={this.onClickAddOdaName} variant="contained" color="primary">
                  Kaydet
                </Button>
              </CardActions>
            </Card>
          </Box>
        } */}
        <div>
          <Grid container spacing={3}>
            <Grid item lg={3} md={12} xl={9} xs={12}>
              <Card style={{ textAlign: "center" }}>
                <Typography center variant="h5">
                  Şarkı süresi {this.timeOfSum} saniye
                  </Typography>
              </Card>
              {this.props.durationStamps > 0 &&
                <div>
                  <CreateCor />
                </div>
              }
            </Grid >
          </Grid>
          {/* <Button
              className={useStyles.button}
              variant="contained"
              color="primary"
              onClick={this.onCsvExcel}
            >
              HİSSET
            </Button>
            <Button
              className={useStyles.button}
              variant="contained"
              color="primary"
              onClick={this.onCloseEveryComponent}
            >
              KAPAT
              </Button>
            <div style={{ textAlign: "right" }}>
              <Button
                className={useStyles.button}
                variant="contained"
                color="primary"
                endIcon={<Icon>Yolla</Icon>}
              >
                <ExportCSV
                  csvData={this.state.excelData}
                  fileName={this.state.fileName}
                />
              </Button>
            </div> */}
        </div>

        <CssBaseline >
          <SpotifyFooterMakeCor
            style={{
              fontFamily:
                "spotify-circular,Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif"
            }}
          >
          </SpotifyFooterMakeCor>
        </CssBaseline>
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
    setSmokeTemperature: smokeTemperature =>
      dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
