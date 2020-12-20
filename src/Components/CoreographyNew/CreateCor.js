import React, { forwardRef, Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";
import {
  FormControlLabel,
  Card,
  Typography,
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
import Cloud from "@material-ui/icons/Cloud";
import CloudQueue from "@material-ui/icons/CloudQueue";
import Highlight from "@material-ui/icons/Highlight";
import HighlightOutlined from "@material-ui/icons/HighlightOutlined";
import SaveIcon from "@material-ui/icons/Save";
import SmokeStatus from "./SmokeStatus";
import SilderInput from "./SilderInput";
import Brightness from "./Brightness";
import Blinker from "./Blinker";
import APIServices from "../Services/APIServices";
import RobotOptions from "./RobotOptions";
import CreateCorPopUp from "./CreateCorPopUp";

class CreateCor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [1],
      checkedMultiple: [],
      corData: [],
      saveCorData: [],
      selectedSecond: [],
      selectedColor: "#fff",
      checkSmoke: 0,
      checkBlind: 1,
      clearSecondList: [],
      userCorData: [],
    };
    this.apiService = new APIServices();
  }
  componentDidMount() {
    if (this.props.durationStamps) {
      this.clearSeconds = Math.round(
        this.milisToMinutesAndSeconds(this.props.durationStamps) / 3
      );
      this.getSeconds = Array.from(Array(this.clearSeconds).keys());
      // console.log("componentDidMount", this.props.durationStamps, ",", this.getSeconds)
      this.setState({ clearSecondList: this.getSeconds });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.durationStamps !== prevProps.durationStamps) {
      this.clearSeconds = Math.round(
        this.milisToMinutesAndSeconds(this.props.durationStamps) / 3
      );
      this.getSeconds = Array.from(Array(this.clearSeconds).keys());
      // console.log("componentDidUpdate", this.props.durationStamps, ",", this.getSeconds)
      this.setState({ clearSecondList: this.getSeconds });
    }
  }
  saveCoreography = (props) => {
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
    console.log("corData", corData);
  };
  goParty = () => {
    const { corData } = this.state;
    console.log("cordata", corData);
    let stringCSV = JSON.stringify({ corData });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: this.milisToMinutesAndSeconds(this.props.durationStamps),
    };
    this.props.socket.emit("corData", encodedString);
    this.props.setCorData(this.state.corData);
  };
  saveUserCoreographyToDB = () => {
    this.props.setCreateCorPopup(true)
    this.props.setCorData(this.state.corData);
    this.setState({ goCoreography: true });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeSmoke = (event) => {
    if (event.target.checked) {
      this.setState({ checkSmoke: 1 });
    } else {
      this.setState({ checkSmoke: 0 });
    }
  };
  milisToMinutesAndSeconds = (mil) => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };
  handleToggle = (value) => {
    this.setState({ selectedSecond: value });
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
    const { colour } = this.props;
    const { checkBlind, checkSmoke, checkedMultiple } = this.state;
    // console.log("render", this.props.durationStamps, ",", this.getSeconds)
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper style={{ maxHeight: 700, overflow: "auto" }}>
              {this.state.clearSecondList && (
                <List>
                  {this.state.clearSecondList.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <React.Fragment>
                        <ListItem
                          key={value}
                          role={undefined}
                          dense
                          button
                          onClick={() => this.handleToggleMultiple(value)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checkedMultiple.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`${value * 3} - ${value * 3 + 3} second`}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </List>
              )}
            </Paper>
          </Grid>
          <Grid item xs={8}>
            {this.state.checkedMultiple && (
              <React.Fragment>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <RobotOptions robot={"L"} />
                      </Grid>
                      <Grid item xs={6}>
                        <RobotOptions robot={"R"} />
                      </Grid>
                    </Grid>
                    {this.props.createCorPopup &&
                      <CreateCorPopUp />
                    }
                    <Grid container spacing={3}>
                      <Grid item xs={11}>
                        <SmokeStatus />
                      </Grid>
                      <Grid item xs={1}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkSmoke}
                              onChange={this.handleChangeSmoke}
                              name="checkSmoke"
                              color="primary"
                            />
                          }
                          label="Smoke"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ flex: 1 }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.saveCoreography}
                    >
                      Save For Party
                    </Button>
                    <Button
                      style={{ flex: 1 }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.goParty}
                    >
                      Go Party
                    </Button>
                    <Button
                      style={{ flex: 1 }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.saveUserCoreographyToDB}
                    >
                      Save For MyCHR
                    </Button>
                  </CardActions>
                </Card>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </div>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorData: corData => dispatch({ type: actionTypes.COR_DATA, corData }),
    setCreateCorPopup: createCorPopup => dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup }),
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setColourNumber: (number) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR_NUMBER, number }),
    setColour: (colour) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR, colour }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCor);
