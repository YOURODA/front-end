import React, { forwardRef, Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { CirclePicker } from 'react-color';
import {
  FormControlLabel, Card, Typography, CardContent,
  List, ListItem, ListItemText, ListItemIcon, Checkbox, Button,
  Divider, Grid, Paper,
  CardActions
} from '@material-ui/core';
import Cloud from '@material-ui/icons/Cloud';
import CloudQueue from '@material-ui/icons/CloudQueue';
import Highlight from '@material-ui/icons/Highlight';
import HighlightOutlined from '@material-ui/icons/HighlightOutlined';
import SaveIcon from '@material-ui/icons/Save';
import SmokeStatus from "./SmokeStatus";
import SilderInput from "./SilderInput"
import Brightness from "./Brightness"
import Blinker from "./Blinker"
import APIServices from '../Services/APIServices';
import ObjectAssign from 'object-assign'

class CreateCor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [1],
      checkedMultiple: [],
      corData: [],
      saveCorData: [],
      selectedSecond: [],
      selectedColor: '#fff',
      checkSmoke: 0,
      checkBlind: 1,
      clearSecondList: [],
      userCorData: [],
      color:{
        lColor1:0,
        lColor2:0,
        lColor3:0,
        rColor1:0,
        rColor2:0,
        rColor3:0
      }

    };
    this.apiService = new APIServices();
  }
  componentDidMount() {
    if (this.props.durationStamps) {
      this.clearSeconds = Math.round(this.milisToMinutesAndSeconds(this.props.durationStamps) / 3)
      this.getSeconds = Array.from(Array(this.clearSeconds).keys())
      // console.log("componentDidMount", this.props.durationStamps, ",", this.getSeconds)
      this.setState({ clearSecondList: this.getSeconds })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.durationStamps !== prevProps.durationStamps) {
      this.clearSeconds = Math.round(this.milisToMinutesAndSeconds(this.props.durationStamps) / 3)
      this.getSeconds = Array.from(Array(this.clearSeconds).keys())
      // console.log("componentDidUpdate", this.props.durationStamps, ",", this.getSeconds)
      this.setState({ clearSecondList: this.getSeconds })

    }
  }
  saveCoreography = (props) => {
    const { durationStamps } = this.props;
    const { checkedMultiple, corData } = this.state;
    const {lColor1,lColor2,lColor3,rColor1,rColor2,rColor3}= this.state.color
    const second = this.milisToMinutesAndSeconds(durationStamps)
    let saveCorData = corData
    //hor,0,ver,0,0,bright,red,green,blue,white,blinker,randomLight,background
    checkedMultiple.forEach(seconds => {
      if (!saveCorData[seconds]) {
        saveCorData[seconds] = {
          "startDate": seconds,
          "robot": `${this.props.leftHorValue ? this.props.leftHorValue : "0"},0,${this.props.leftVerValue ? this.props.leftVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${lColor1},${lColor2},${lColor3},"59",${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0,${this.props.rightHorValue ? this.props.rightHorValue : "0"},0,${this.props.rightVerValue ? this.props.rightVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${rColor1},${rColor2},${rColor3},0,${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0`, smoke: this.state.checkSmoke === true ? "1" : "0",//L
          "smoke": this.state.checkSmoke,//L
        }
      }
      if (saveCorData[seconds] && saveCorData[seconds].startDate !== seconds) {
        // console.log(saveCorData[seconds].startDate)
        saveCorData[seconds] = {
          "startDate": seconds,
          "robot": `${this.props.leftHorValue ? this.props.leftHorValue : "0"},0,${this.props.leftVerValue ? this.props.leftVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${lColor1},${lColor2},${lColor3},"59",${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0,${this.props.rightHorValue ? this.props.rightHorValue : "0"},0,${this.props.rightVerValue ? this.props.rightVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${rColor1},${rColor2},${rColor3},0,${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0`, smoke: this.state.checkSmoke === true ? "1" : "0",//L
          "smoke": this.state.checkSmoke === true ? "1" : "0",//L
        }
      }


    })
    this.setState({ corData: saveCorData })
    console.log("corData", corData)
    // console.log("corData", corData)
    // let stringCSV = JSON.stringify({ corData });
    // const encodedString = { "base": new Buffer(stringCSV).toString('base64'), "time": this.milisToMinutesAndSeconds(this.props.durationStamps) }
    // this.props.socket.emit(
    //   "corData",
    //   encodedString
    // );
    // this.props.setCorData(this.state.corData)
    //TO-DO odaya katıldıysa backend den bağlandı mesajı kontrolü
    // console.log(this.props.socket)
    // this.props.socket.emit('tryCor', this.state.corData);
  }
  goParty = () => {
    const { checkedMultiple, corData,color } = this.state
    let stringCSV = JSON.stringify({ corData });
    const encodedString = { "base": new Buffer(stringCSV).toString('base64'), "time": this.milisToMinutesAndSeconds(this.props.durationStamps) }
    this.props.socket.emit(
      "corData",
      encodedString
    );
    this.props.setCorData(this.state.corData)
  }
  saveUserCoreographyToDB = () => {
    const { durationStamps } = this.props;
    const { checkedMultiple, corData } = this.state;
    let saveCorData = corData
    //hor,0,ver,0,0,bright,red,green,blue,white,blinker,randomLight,background
    checkedMultiple.forEach(seconds => {
      saveCorData[seconds] = {
        "startDate": seconds,
        "robot": `${this.props.leftHorValue ? this.props.leftHorValue : "0"},0,${this.props.leftVerValue ? this.props.leftVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${this.lColor1 ? this.lColor1 : "0"},${this.lColor2 ? this.lColor2 : "0"},${this.lColor3 ? this.lColor3 : "0"},"59",${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0,${this.props.rightHorValue ? this.props.rightHorValue : "0"},0,${this.props.rightVerValue ? this.props.rightVerValue : "0"},0,0,${this.props.brightnessValue ? this.props.brightnessValue : "0"},${this.rColor1 ? this.rColor1 : "0"},${this.rColor2 ? this.rColor2 : "0"},${this.rColor3 ? this.rColor3 : "0"},0,${this.props.blinkerValue ? this.props.blinkerValue : "0"},0,0`, smoke: this.state.checkSmoke === true ? "1" : "0",//L
        "smoke": this.state.checkSmoke,//L
      }
      this.setState({ userCorData: saveCorData[seconds] })
    })
    this.apiService.createCoreography(this.state.userCorData)
    this.setState({ goCoreography: true })
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
  handleRightColorPWMValues = (event) => {
    const {color}= this.state
    color.rColor1 = (Math.ceil((event.rgb.r)).toString())
    color.rColor2 = (Math.ceil((event.rgb.g)).toString())
    color.rColor3 = (Math.ceil((event.rgb.b)).toString())
    this.setState({color})
  };
  handleLeftColorPWMValues = (event) => {
    const {color}= this.state
    color.lColor1 = (Math.ceil((event.rgb.r)).toString())
    color.lColor2 = (Math.ceil((event.rgb.g)).toString())
    color.lColor3 = (Math.ceil((event.rgb.b)).toString())
    this.setState({color})
  };
  handleChangeSmoke = (event) => {
    if (event.target.checked) {
      this.setState({ checkSmoke: 1 })
    }
    else {
      this.setState({ checkSmoke: 0 })
    }
  }
  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };
  handleToggle = (value) => {
    this.setState({ selectedSecond: value })
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
    const { checkBlind, checkSmoke, checkedMultiple ,color} = this.state
    // console.log("render", this.props.durationStamps, ",", this.getSeconds)
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper style={{ maxHeight: 700, overflow: 'auto' }}>
              {this.state.clearSecondList &&
                <List>
                  {this.state.clearSecondList.map((value) => {
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
                          <ListItemText id={labelId} primary={`${value*3} - ${(value*3)+3} second`} />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    )
                  })}
                </List>
              }
            </Paper>
          </Grid>
          <Grid item xs={8}>
            {this.state.checkedMultiple &&
              <React.Fragment>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <SilderInput label={"LeLiRo Horizontal"} robot={"L"} color={ color}  />
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
                      <SilderInput label={"RiLiRo Horizontal"} robot={"R"} color={ color}  />
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
                      onClick={this.saveCoreography}>
                      Save For CH
                    </Button>
                    <Button
                      style={{ flex: 1 }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.goParty}>
                      Go Party
                    </Button>
                    <Button
                      style={{ flex: 1 }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.saveUserCoreographyToDB}>
                      Save For MyCHR
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
    blinkerValue: state.blinkerValue,
    user: state.current_user

  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCorData: corData => dispatch({ type: actionTypes.COR_DATA, corData })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCor);
