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
  FormControl
} from '@material-ui/core';
import Cloud from '@material-ui/icons/Cloud';
import CloudQueue from '@material-ui/icons/CloudQueue';
import Highlight from '@material-ui/icons/Highlight';
import HighlightOutlined from '@material-ui/icons/HighlightOutlined';

class CreateCor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [1],
      secondList: [],
      selectedSecond: 0,
      openVelocity: false,
      velocity: null,
      selectedColor: '#fff',
      checkSmoke: false,
      checkBlind: false
    };
  }

  handleClose = () => {
    this.setState({ openVelocity: false })
  };
  handleChange = (event) => {
    this.setState({ velocity: event.target.value })
  };
  handleOpen = () => {
    this.setState({ openVelocity: true })
  };
  handleChangeComplete = (color) => {
    this.setState({ selectedColor: color });
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
    console.log(seconds)
  }

  componentDidMount() {
    this.setList()
  }

  handleToggle = (value) => {
    this.setState({ selectedSecond: value })
  };

  render() {
    const { selectedSecond, velocity, openVelocity, selectedColor, checkBlind, checkSmoke } = this.state
    this.props.setCsvData(this.state.data);
    if (selectedColor !== null) {
      console.log(selectedColor)
    }
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
            <Grid container spacing={3}>
              {this.state.selectedSecond &&
                <React.Fragment>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                          <InputLabel htmlFor="outlined-age-native-simple">Left Light Robot Velocity</InputLabel>
                          <Select
                            native
                            value={velocity}
                            onChange={this.handleChange}
                            label="Age"
                            inputProps={{
                              name: 'age',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={10}>Low</option>
                            <option value={20}>Medium</option>
                            <option value={30}>High</option>
                          </Select>
                        </FormControl>
                        <Typography variant="button">Select Color For Left Robot</Typography>
                        <div style={{ float: 'center' }}>
                          <CirclePicker
                            color={this.state.selectedColor}
                            onChangeComplete={this.handleChangeComplete}
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
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                          <InputLabel htmlFor="outlined-age-native-simple">Right Light Robot Velocity</InputLabel>
                          <Select
                            native
                            value={velocity}
                            onChange={this.handleChange}
                            label="Age"
                            inputProps={{
                              name: 'age',
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
                          onChangeComplete={this.handleChangeComplete}
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
                          label="Blind"
                        /> {checkBlind === false &&
                          <HighlightOutlined />}
                        {checkBlind === true &&
                          <Highlight />}
                      </CardContent>
                    </Card>

                  </Grid>
                </React.Fragment>
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    durationStamps: state.durationStamps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCsvData: csvData => dispatch({ type: actionTypes.CSV_DATA, csvData })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCor);
