import React, { forwardRef, Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { CirclePicker } from 'react-color';
import {
  FormControlLabel, Card, CardHeader, Typography, CardContent,
  NativeSelect, List, ListItem, ListItemText, ListItemIcon, IconButton,
  ListItemSecondaryAction, Checkbox, Button,
  Divider, Grid, Select, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,
  InputLabel, MenuItem, TextField,
  FormControl,
  CardActions
} from '@material-ui/core';
import Cloud from '@material-ui/icons/Cloud';
import CloudQueue from '@material-ui/icons/CloudQueue';
import Highlight from '@material-ui/icons/Highlight';
import HighlightOutlined from '@material-ui/icons/HighlightOutlined';
import SaveIcon from '@material-ui/icons/Save';
import SmokeStatus from "./SmokeStatus";
import LeftHorizontalStatus from "./LeftHorizontalStatus"
import LeftVerticalStatus from "./LeftVerticalStatus"
import RightHorizontalStatus from "./RightHorizontalStatus"
import RightVerticalStatus from "./RightVerticalStatus"
import Brightness from "./Brightness"
import Blinker from "./Blinker"
const colorPWM = 65534 / 256;
class CreateCor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      takenSecondList: null,
      checked: [1],
      checkedMultiple: [],
      corData: [
        // {
        //   startDate: '',
        //   lRobotsSpeed1: 200,
        //   lRobotsSpeed2: 200,
        //   rRobotsSpeed1: 200,
        //   rRobotsSpeed2: 200,
        //   rColor1: "65534",
        //   rColor2: "0",
        //   rColor3: "0",
        //   lColor1: "0",
        //   lColor2: "0",
        //   lColor3: "0",
        //   smoke: 1,
        //   // blinker: 5
        // },
      ],
      tryCorData: [
        {
          startDate: '',
          lRobotsSpeed1: 200,
          lRobotsSpeed2: 200,
          rRobotsSpeed1: 200,
          rRobotsSpeed2: 200,
          rColor1: "65534",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "0",
          lColor3: "0",
          smoke: 1,
          // blinker: 5
        },
      ],
      secondList: [],
      selectedSecond: [],
      openVelocity: false,
      velocityRight: null,
      velocityLeft: null,
      locationRight: null,
      locationLeft: null,
      selectedColor: '#fff',
      checkSmoke: 0,
      openSelectSeconds: false,
      checkBlind: 1
    };
  }
  selectSecondsForCoreographyOpen = () => {
    this.setState({ openSelectSeconds: true });
  }
  selectSecondsForCoreographyClose = () => {
    this.setState({ openSelectSeconds: false });
  }
  tryCoreography = () => {
    let tryDataForCor = []
    this.state.checkedMultiple.forEach(second => {
      tryDataForCor.push({
        "startDate": second,
        "leftHorValue": this.props.leftHorValue ? this.props.leftHorValue : "0",
        "leftVerValue": this.props.leftVerValue ? this.props.leftVerValue : "0",
        "rightHorValue": this.props.rightHorValue ? this.props.rightHorValue : "0",
        "rightVerValue": this.props.rightVerValue ? this.props.rightVerValue : "0",
        "rColor1": this.rColor1 ? this.rColor1 : "0",
        "rColor2": this.rColor2 ? this.rColor2 : "0",
        "rColor3": this.rColor3 ? this.rColor3 : "0",
        "lColor1": this.lColor1 ? this.lColor1 : "0",
        "lColor2": this.lColor2 ? this.lColor2 : "0",
        "lColor3": this.lColor3 ? this.lColor3 : "0",
        "smoke": this.state.checkSmoke === true ? "1" : "0",
        "blinker": this.state.checkBlind === true ? "1" : "0"
      })
    })
    this.setState({
      tryCorData: tryDataForCor
    })
    // console.log(tryDataForCor)
    let stringCSV = JSON.stringify(this.state.tryCorData);
    const encodedString = { "base": new Buffer(stringCSV).toString('base64'), "time": this.milisToMinutesAndSeconds(this.props.durationStamps) }
    this.props.socket.emit(
      "tryCor",
      encodedString
    );
    // this.props.setCorData(this.state.corData)
    //TO-DO odaya katıldıysa backend den bağlandı mesajı kontrolü
    // this.props.socket.emit('tryCor', this.state.corData);
  }
  saveCoreography = () => {
    const { durationStamps } = this.props
    const { checkedMultiple, corData } = this.state
    const second = this.milisToMinutesAndSeconds(durationStamps)
    let newcor = corData
    // if(corData.length !== second){
    //   newcor = Array.from(Array(3), () => 0)
    // }
    //hor,0,ver,0,0,bright,red,green,blue,white,blinker,randomLight,background
    checkedMultiple.map(seconds => {
      newcor[seconds] = {
        startDate: seconds,
        A: `${this.props.leftHorValue ? this.props.leftHorValue : "0"},0,${this.props.leftVerValue ? this.props.leftVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${this.lColor1 ? this.lColor1 : "0"},${this.lColor2 ? this.lColor2 : "0"},${this.lColor3 ? this.lColor3 : "0"},0,${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0,${this.props.rightHorValue ? this.props.rightHorValue : "0"},0,${this.props.rightVerValue ? this.props.rightVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${this.rColor1 ? this.rColor1 : "0"},${this.rColor2 ? this.rColor2 : "0"},${this.rColor3 ? this.rColor3 : "0"},0,${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0`, smoke: this.state.checkSmoke === true ? "1" : "0",//L
      }
    })
    this.setState({ corData: newcor })
    console.log("saveData", newcor)
    console.log(this.state.corData)
    let stringCSV = JSON.stringify({ corData });
    const encodedString = { "base": new Buffer(stringCSV).toString('base64'), "time": this.milisToMinutesAndSeconds(this.props.durationStamps) }
    this.props.socket.emit(
      "corData",
      encodedString
    );
    console.log(encodedString)
    // this.props.setCorData(this.state.corData)
    //TO-DO odaya katıldıysa backend den bağlandı mesajı kontrolü
    // console.log(this.props.socket)
    // this.props.socket.emit('tryCor', this.state.corData);
  }
  handleClose = () => {
    this.setState({ openVelocity: false })
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
  handleOpen = () => {
    this.setState({ openVelocity: true })
  };
  handleRightColorPWMValues = (event) => {
    this.rColor1 = (Math.ceil((event.rgb.r)).toString())
    this.rColor2 = (Math.ceil((event.rgb.g)).toString())
    this.rColor3 = (Math.ceil((event.rgb.b)).toString())
  };
  handleLeftColorPWMValues = (event) => {
    this.lColor1 = (Math.ceil((event.rgb.r)).toString())
    this.lColor2 = (Math.ceil((event.rgb.g)).toString())
    this.lColor3 = (Math.ceil((event.rgb.b)).toString())
  };
  handleChangeSmoke = (event) => {
    this.setState({ checkSmoke: event.target.checked })
  }
  handleChangeBlind = (event) => {
    this.setState({ checkBlind: event.target.checked })
  }
  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };

  setList = () => {
    const { seconds } = this.props
    let getSeconds = new Array(seconds).join('0').split('').map(parseFloat)
    const takenSecondList = getSeconds.map((index, value) => value)
    this.setState({ takenSecondList })
  }
  componentDidMount() {
    this.setList()
    // const askTemperature = ''
    // try {
    //   setInterval(() => {
    //     this.props.socket.emit("askTemperature", askTemperature);
    //   }, 3000);
    // } catch (e) {
    //   console.log(e);
    // }
    // this.props.socket.emit("askTemperature", askTemperature =>
    //   console.log(askTemperature)
    // );
    // this.props.socket.on("temperature", askTemperature =>
    //   console.log(askTemperature)
    // );
  }
  componentWillMount() {
    // this.props.socket.off('temperature')
  }

  handleToggle = (value) => {
    this.setState({ selectedSecond: value })
  };
  handleToggleMultiple = (value) => {
    const currentIndex = this.state.checkedMultiple.indexOf(value);
    const newChecked = [...this.state.checkedMultiple];
    console.log('new', newChecked)
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ checkedMultiple: newChecked });
    // console.log(this.state.checkedMultiple)
  };


  render() {
    const { checkBlind, checkSmoke, checkedMultiple, takenSecondList } = this.state
    console.log("this.props.leftHorValue", this.props.leftHorValue)
    console.log("this.props.leftVerValue", this.props.leftVerValue)
    console.log("this.props.rightHorValue", this.props.rightHorValue)
    console.log("this.props.rightVerValue", this.props.rightVerValue)
    console.log("this.props.brightnessValue", this.props.brightnessValue)
    console.log("this.props.blinkerValue", this.props.blinkerValue)
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {takenSecondList &&
              <List>
                {takenSecondList.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return (
                    <React.Fragment>
                      <ListItem key={value} role={undefined} dense button onClick={() => this.handleToggleMultiple(value)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checkedMultiple.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value}.second`} />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            }
          </Grid>
          <Grid item xs={8}>
            {this.state.checkedMultiple &&
              <React.Fragment>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <LeftHorizontalStatus />
                        <LeftVerticalStatus />
                        <Typography variant="button">Select Color For Left Robot</Typography>
                        <div style={{ float: 'center' }}>
                          <CirclePicker
                            color={this.state.selectedColor}
                            onChangeComplete={this.handleLeftColorPWMValues}
                          />
                        </div>
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
                        /> {checkSmoke === false &&
                          <CloudQueue />}
                        {checkSmoke === true &&
                          <Cloud />}
                      </Grid>
                      <Grid item xs={6}>
                        <RightHorizontalStatus />
                        <RightVerticalStatus />
                        <Typography variant="button">Select Color For Right Robot</Typography>
                        <CirclePicker
                          color={this.state.selectedColor}
                          onChangeComplete={this.handleRightColorPWMValues}
                        />
                        <Brightness />
                        <Blinker />
                        {checkBlind === 0 &&
                          <HighlightOutlined />}
                        {checkBlind === 1 &&
                          <Highlight />}
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
                      onClick={this.tryCoreography}>
                      Try it
                    </Button>
                    <Button
                      style={{ flex: 1 }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.saveCoreography}>
                      Save it
                    </Button>
                  </CardActions>
                  <SmokeStatus />
                </Card>
              </React.Fragment>
            }
          </Grid>
        </Grid>
      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    durationStamps: state.durationStamps,
    socket: state.socket,
    leftHorValue: state.leftHorValue,
    leftVerValue: state.leftVerValue,
    rightHorValue: state.rightHorValue,
    rightVerValue: state.rightVerValue,
    brightnessValue: state.brightnessValue,
    blinkerValue: state.blinkerValue

  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCorData: corData => dispatch({ type: actionTypes.COR_DATA, corData })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCor);
