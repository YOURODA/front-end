import React, { Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import {
  FormControlLabel,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
  Grid,
  Paper,
  CardActions,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import SmokeStatus from "./SmokeStatus";
import Smoke from "./Smoke";
import { withStyles } from "@material-ui/styles";
import APIServices from "../Services/APIServices";
import RobotOptions from "./RobotOptions";
import CreateCorPopUp from "./CreateCorPopUp";
import SelectedDevicePopUp from "./SelectedDevicePopUp";
import MiniCorGroup from "./miniCorGroup/MiniCorGroup";
import ListOfSeconds from "./ListOfSeconds/index";
import { regulatorCorTry } from "../../utils";
const useStyles = (theme) => ({
  active: {
    backgroundColor: "#e8eaf6",
    height: "50px",
  },
  nonActive: {
    backgroundColor: "#ffffff",
    height: "50px",
  },
  listSecond: {
    height: "24pt",
  },
});
class CreateCor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1],
      checkedMultiple: [],
      corData: [],
      saveCorData: [],
      changeSecondsColor: false,
      clearSecondList: [],
      selectedDevicePopUp: false,
    };
    this.apiService = new APIServices();
  }
  componentDidMount() {
    // document.addEventListener("keydown", this.tryFunction, false);
    const { durationStamps, songCor, setSongCor } = this.props;
    if (durationStamps) {
      this.clearSeconds = Math.round(
        this.milisToMinutesAndSeconds(durationStamps) / 2
      );
      this.getSeconds = Array.from(Array(this.clearSeconds).keys());
      this.setState({ clearSecondList: this.getSeconds });
      if (songCor.length === 0) {
        let newSongCor = new Array(this.clearSeconds).fill(0);
        newSongCor = newSongCor.map((cor, index) => {
          return {
            startDate: index,
            robot: {
              LHor: 0,
              LVer: 0,
              LBrightness: 0,
              LBlinker: 0,
              LSpeed: 0,
              RHor: 0,
              RVer: 0,
              RBrightness: 0,
              RBlinker: 0,
              RSpeed: 0,

              colour: {
                lColor1: 0,
                lColor2: 0,
                lColor3: 0,
                rColor1: 0,
                rColor2: 0,
                rColor4: 0,
                Lhex: "#000000",
                Rhex: "#000000",
              },
            },
            smoke: false,
          };
        });
        setSongCor(newSongCor);
      }
    }
  }
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.tryFunction, false);
  // }
  componentDidUpdate(prevProps) {
    if (this.props.durationStamps !== prevProps.durationStamps) {
      this.clearSeconds = Math.round(
        this.milisToMinutesAndSeconds(this.props.durationStamps) / 2
      );
      this.getSeconds = Array.from(Array(this.clearSeconds).keys());
      this.setState({ clearSecondList: this.getSeconds });
    }
  }

  // tryFunction({keyCode:84})
  saveCoreography = () => {
    const { colour } = this.props;
    const { checkedMultiple, corData } = this.state;
    const { lColor1, lColor2, lColor3, rColor1, rColor2, rColor3 } = colour;
    let saveCorData = corData;
    checkedMultiple.forEach((seconds) => {
      if (!saveCorData[seconds]) {
        saveCorData[seconds] = {
          startDate: seconds,
          robot: `${
            this.props.leftHorValue ? this.props.leftHorValue : "0"
          },0,${this.props.leftVerValue ? this.props.leftVerValue : "0"},0,0,${
            this.props.brightnessValue.L ? this.props.brightnessValue.L : "0"
          },${lColor1},${lColor2},${lColor3},"59",${
            this.props.blinkerValue.L ? this.props.blinkerValue.L : "0"
          },0,0,${
            this.props.rightHorValue ? this.props.rightHorValue : "0"
          },0,${
            this.props.rightVerValue ? this.props.rightVerValue : "0"
          },0,0,${
            this.props.brightnessValue.R ? this.props.brightnessValue.R : "0"
          },${rColor1},${rColor2},${rColor3},0,${
            this.props.blinkerValue.R ? this.props.blinkerValue.R : "0"
          },0,0`,
          smoke: this.state.checkSmoke === true ? "1" : "0", //L
          smoke: this.state.checkSmoke, //L
        };
      }
      if (saveCorData[seconds] && saveCorData[seconds].startDate !== seconds) {
        saveCorData[seconds] = {
          startDate: seconds,
          robot: `${
            this.props.leftHorValue ? this.props.leftHorValue : "0"
          },0,${this.props.leftVerValue ? this.props.leftVerValue : "0"},0,0,${
            this.props.brightnessValue.L ? this.props.brightnessValue.L : "0"
          },${lColor1},${lColor2},${lColor3},"59",${
            this.props.blinkerValue.L ? this.props.blinkerValue.L : "0"
          },0,0,${
            this.props.rightHorValue ? this.props.rightHorValue : "0"
          },0,${
            this.props.rightVerValue ? this.props.rightVerValue : "0"
          },0,0,${
            this.props.brightnessValue.R ? this.props.brightnessValue.R : "0"
          },${rColor1},${rColor2},${rColor3},0,${
            this.props.blinkerValue.R ? this.props.blinkerValue.R : "0"
          },0,0`,
          smoke: this.state.checkSmoke === true ? "1" : "0", //L
          smoke: this.state.checkSmoke === true ? "1" : "0", //L
        };
      }
    });
    this.setState({ corData: saveCorData });
  };
  openSelectDevicePopUp = () => {
    this.setState({ selectedDevicePopUp: true });
  };
  closeSelectDevicePopUp = () => {
    this.setState({ selectedDevicePopUp: false });
  };
  goParty = (id) => {
    this.closeSelectDevicePopUp();
    const { corData } = this.state;
    let stringCSV = JSON.stringify({ corData });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: this.milisToMinutesAndSeconds(this.props.durationStamps),
    };
    this.props.socket.emit("corData", encodedString);
    this.props.setCorData(this.state.corData);
    this.props.setIsReturnMusic(id);
  };
  saveUserCoreographyToDB = () => {
    this.props.setCreateCorPopup(true);
    this.props.setCorData(this.state.corData);
    this.setState({ goCoreography: true });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  milisToMinutesAndSeconds = (mil) => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };
  handleToggleMultiple = (value) => {
    const currentIndex = this.state.checkedMultiple.indexOf(value);
    const newChecked = [...this.state.checkedMultiple];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ checkedMultiple: newChecked });
  };

  render() {
    const { classes } = this.props;
    const {
      checkSmoke,
      checkedMultiple,
      selectedDevicePopUp,
      clearSecondList,
    } = this.state;
    // this.tryFunction({ keyCode: 84 });
    return (
      <Grid container spacing={3}>
        {selectedDevicePopUp && (
          <SelectedDevicePopUp
            send={(id) => this.goParty(id)}
            onClose={this.closeSelectDevicePopUp}
          />
        )}
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <>
            {checkedMultiple && (
              <React.Fragment>
                <div id="one" onKeyPress={this.handleKeyPress} />
                <MiniCorGroup />
                <Card>
                  <CardContent>
                    {this.props.songCor.length !== 0 && (
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <ListOfSeconds
                            clearSecondList={clearSecondList}
                            classes={classes}
                          />
                        </Grid>
                        <Grid item xs={1} />
                        <RobotOptions robot={"L"} />
                        <RobotOptions robot={"R"} />
                        {/* <Grid item xs={2} /> */}
                      </Grid>
                    )}
                    {this.props.createCorPopup && <CreateCorPopUp />}
                    <Grid container spacing={3}>
                      <Smoke />
                    </Grid>
                  </CardContent>
                </Card>
              </React.Fragment>
            )}
          </>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    durationStamps: state.durationStamps,
    socket: state.socket,
    leftHorValue: state.leftHorValue,
    leftVerValue: state.leftVerValue,
    rightHorValue: state.rightHorValue,
    rightVerValue: state.rightVerValue,
    brightnessValue: state.brightnessValue,
    blinkerValue: state.blinkerValue,
    createCorPopup: state.createCorPopup,
    user: state.current_user,
    colour: state.colour,
    colourNumber: state.colourNumber,
    isReturnMusic: state.isReturnMusic,
    songCor: state.songCor,
    songCor: state.songCor,
    selectedSecond: state.selectedSecond,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setCreateCorPopup: (createCorPopup) =>
      dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup }),
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setColourNumber: (number) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR_NUMBER, number }),
    setColour: (colour) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR, colour }),
    setIsReturnMusic: (isReturnMusic) =>
      dispatch({ type: actionTypes.IS_RETURN_MUSIC, isReturnMusic }),
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(CreateCor));
