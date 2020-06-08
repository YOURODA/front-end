import React, { forwardRef, Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { CirclePicker } from 'react-color';
import {
  FormControlLabel, Card, CardHeader, Typography, CardContent,
  NativeSelect, List, ListItem, ListItemText,
  ListItemSecondaryAction, Checkbox, Button,
  Divider, Grid, Select,
  InputLabel, MenuItem,
  FormControl,
  CardActions
} from '@material-ui/core';
import socketIo from "socket.io-client";
import Cloud from '@material-ui/icons/Cloud';
import CloudQueue from '@material-ui/icons/CloudQueue';
import Highlight from '@material-ui/icons/Highlight';
import HighlightOutlined from '@material-ui/icons/HighlightOutlined';
import SaveIcon from '@material-ui/icons/Save';

const colorPWM = 65534 / 256;
class CreateCor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [1],
      corData: [
        {
          startDate: 1,
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
      selectedSecond: 0,
      openVelocity: false,
      velocityRight: null,
      velocityLeft: null,
      locationRight: null,
      locationLeft: null,
      selectedColor: '#fff',
      checkSmoke: 0,
      checkBlind: 1
    };
  }

  saveCoreography = () => {
    this.setState({
      corData: [{
        startDate: this.state.selectedSecond,
        lRobotsSpeed1: this.state.velocityLeft ? this.state.velocityLeft : "0",
        lRobotsSpeed2: this.state.locationLeft ? this.state.locationLeft : "0",
        rRobotsSpeed1: this.state.velocityRight ? this.state.velocityRight : "0",
        rRobotsSpeed2: this.state.locationRight ? this.state.locationRight : "0",
        rColor1: this.rColor1 ? this.rColor1 : "0",
        rColor2: this.rColor2 ? this.rColor2 : "0",
        rColor3: this.rColor3 ? this.rColor3 : "0",
        lColor1: this.lColor1 ? this.lColor1 : "0",
        lColor2: this.lColor2 ? this.lColor2 : "0",
        lColor3: this.lColor3 ? this.lColor3 : "0",
        smoke: this.state.checkSmoke === true ? "1" : "0",
        blinker: this.state.checkBlind === true ? "1" : "0"
      }]
    })
    this.props.setCorData(this.state.corData)
    //TO-DO odaya katıldıysa backend den bağlandı mesajı kontrolü
    console.log(this.props.socket)
    this.props.socket.emit("corData", this.state.corData);
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
    this.rColor1 = (Math.ceil(colorPWM * (event.rgb.r)).toString())
    this.rColor2 = (Math.ceil(colorPWM * (event.rgb.g)).toString())
    this.rColor3 = (Math.ceil(colorPWM * (event.rgb.b)).toString())
  };
  handleLeftColorPWMValues = (event) => {
    this.lColor1 = (Math.ceil(colorPWM * (event.rgb.r)).toString())
    this.lColor2 = (Math.ceil(colorPWM * (event.rgb.g)).toString())
    this.lColor3 = (Math.ceil(colorPWM * (event.rgb.b)).toString())
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
    this.takenSecondList = getSeconds.map((index, value) => value)
  }

  componentDidMount() {
    this.setList()
  }

  handleToggle = (value) => {
    this.setState({ selectedSecond: value })
  };

  render() {
    const { selectedSecond, velocityRight, locationRight, velocityLeft, locationLeft, openVelocity, selectedColor, checkBlind, checkSmoke } = this.state
    if (selectedColor !== null) {
      console.log(selectedColor)
    }
    console.log(this.state.corData)
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <List >
              {this.takenSecondList &&
                this.takenSecondList.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return (
                    <React.Fragment>
                      <ListItem height="100%" width="100%" disabled={selectedSecond === value} onClick={() => this.handleToggle(value)} key={value} role={undefined} dense button >
                        <ListItemText id={labelId} primary={`${value + 0}. second`} />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={8}>
            {this.state.selectedSecond &&
              <React.Fragment>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                          <InputLabel htmlFor="outlined-age-native-simple">Left Light Robot Velocity</InputLabel>
                          <Select
                            native
                            value={velocityLeft}
                            onChange={this.handleChange}
                            label="velocityLeft"
                            inputProps={{
                              name: 'velocityLeft',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={40}>Low</option>
                            <option value={300}>Medium</option>
                            <option value={500}>High</option>
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                          <InputLabel htmlFor="outlined-age-native-simple">Left Light Robot Location</InputLabel>
                          <Select
                            native
                            value={locationLeft}
                            onChange={this.handleChange}
                            label="locationLeft"
                            inputProps={{
                              name: 'locationLeft',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={40}>Low</option>
                            <option value={300}>Medium</option>
                            <option value={500}>High</option>
                          </Select>
                        </FormControl>
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
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                          <InputLabel htmlFor="outlined-age-native-simple">Right Light Robot Velocity</InputLabel>
                          <Select
                            native
                            value={velocityRight}
                            onChange={this.handleChange}
                            label="velocityRight"
                            inputProps={{
                              name: 'velocityRight',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={10}>Low</option>
                            <option value={20}>Medium</option>
                            <option value={30}>High</option>
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                          <InputLabel htmlFor="outlined-age-native-simple">Right Light Robot Location</InputLabel>
                          <Select
                            native
                            value={locationRight}
                            onChange={this.handleChange}
                            label="locationRight"
                            inputProps={{
                              name: 'locationRight',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={10}>Low</option>
                            <option value={20}>Medium</option>
                            <option value={30}>High</option>
                          </Select>
                        </FormControl>
                        <Typography variant="button">Select Color For Right Robot</Typography>
                        <CirclePicker
                          color={this.state.selectedColor}
                          onChangeComplete={this.handleRightColorPWMValues}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkBlind}
                              onChange={this.handleChangeBlind}
                              name="checkBlind"
                              color="primary"
                            />
                          }
                          label="Blinker"
                        /> {checkBlind === 0 &&
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
                      Save it
                    </Button>
                  </CardActions>
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCorData: corData => dispatch({ type: actionTypes.COR_DATA, corData })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCor);
