import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import "./miniCorGroup"
import * as actionTypes from "../../../store/actions/actionTypes";
import styles from "./miniCorGroup.module.css";
import NumberFormat from "react-number-format";
import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slider,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { regulatorCorLoop } from "../../../utils";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import APIService from "../../Services/APIServices";
import { regulatorCorTry } from "../../../utils";
import SaveCorButton from "../SaveCorButton";
import Controller from "./Controller"

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
    // width: 300 + theme.spacing(3) * 2,
  },
  switchStyle: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export const MiniCorGroup = ({
  corLoop,
  corData,
  songCor,
  setSongCor,
  socket,
  isSmokeActive,
  isLiveTry,
  setIsLiveTry,
  setIsSmokeActive,
  user,
  selectedSecond,
}) => {
  const classes = useStyles();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isConsoleActive, setConsoleActive] = useState(false);
  const [selectCorMini, setSelectCorMini] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: 1000,
    height: 1000,
  });
  const [textTime, setTextTime] = useState(0);
  const apiServices = new APIService();

  const startTime = 15;
  const minicorLength = selectCorMini ?.loop ?.miniCor ?.length;
  const songcorlength = 350;
  const [pushCor, setPushCor] = useState([
    startTime,
    startTime + minicorLength * 2,
  ]);
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  });
  if (
    songCor &&
    songCor.length > 0 &&
    isLiveTry.status &&
    isLiveTry.localOdaIp
  ) {
    const regularCor = regulatorCorTry({ cor: songCor[selectedSecond], robotModel: "14chw" });
    apiServices
      .liveTry({ odaIP: isLiveTry.localOdaIp, cor: regularCor })
      .then((response) => {
        if (response.status === 200) {
        }
      });
  }

  const handleChange = (event, newValue) => {
    const newPushCor = [...pushCor];
    if (newValue[0] === pushCor[0]) {
      newPushCor[1] = newValue[1];
      newPushCor[0] = newValue[1] - minicorLength * 2;
    } else {
      newPushCor[0] = newValue[0];
      newPushCor[1] = newValue[0] + minicorLength * 2;
    }
    setTextTime(newPushCor[0]);
    setPushCor(newPushCor);
  };

  const SwitchGroup = () => {
    return (
      <FormGroup row className={classes.switchStyle} >
        {/* <FormControlLabel
          control={
            <PurpleSwitch
              checked={isSmokeActive}
              onChange={() => setIsSmokeActive(!isSmokeActive)}
              color="primary"
            />
          }
          label="Smoke"
        /> */}
        {/* <FormControlLabel
          control={
            <PurpleSwitch
              checked={isConsoleActive}
              onChange={() => setConsoleActive(!isConsoleActive)}
              color="primary"
            />
          }
          label="Console"
        /> */}
        {/* <FormControlLabel
          control={
            <Switch
              checked={isLiveTry.status}
              onChange={() => {
                if (!isLiveTry.status) {
                  let localOdaIp = "";
                  apiServices
                    .myOdaOnlyEmail({ email: user.email })
                    .then((response) => {
                      if (
                        response.status === 200 &&
                        response.data.odas[0].localIp
                      ) {
                        localOdaIp = response.data.odas[0].localIp;
                      }
                      // setIsLiveTry({
                      //   ...isLiveTry,
                      //   status: !isLiveTry.status,
                      //   localOdaIp,
                      // });
                    });
                } else {
                  // setIsLiveTry({ ...isLiveTry, status: !isLiveTry.status });
                }
              }}
              color="primary"
            />
          }
          label="Live Try"
        /> */}
        {/* <SaveCorButton /> */}
      </FormGroup>
    );
  };

  const onDeleteMiniCor = () => {
    console.log("delete", selectCorMini);
  };
  const onChangeChoreography = () => {
    const newSongCorFirst = [...songCor];
    const startTime = [
      pushCor[0] / 2,
      pushCor[0] / 2 + (pushCor[1] - pushCor[0]),
    ];
    const newSongCor = newSongCorFirst.map((second, index) => {
      if (index >= startTime[0] && index <= startTime[1]) {
        const distanceSec = index - startTime[0];
        const secondOptions = JSON.parse(
          JSON.stringify(selectCorMini.loop.miniCor[distanceSec])
        );
        return { ...secondOptions, startDate: index };
      }
      return second;
    });
    setSongCor([...newSongCor]);
  };

  const TextInputSecond = (event) => {
    const newPushCor = [...pushCor];
    let newStart = parseInt(event.target.value);
    if (newStart % 2 !== 0) {
      newStart = newStart - 1;
    }
    if (0 < newStart < songcorlength - minicorLength) {
      newPushCor[0] = newStart;
      newPushCor[1] = newStart + minicorLength - 1;
    }
    setTextTime(newStart);
    setPushCor(newPushCor);
  };

  const tryCorLoop = () => {
    const tryLoop = regulatorCorLoop({
      songCorLoop: selectCorMini.loop.miniCor,
      smoke: false,
      robotModel: "14chw"
    });
    let stringCSV = JSON.stringify({ corData: tryLoop });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: 2,
    };
    socket.emit("corData", encodedString);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Paper style={{ paddingLeft: "12%", maxHeight: windowSize.height - 480, maxWidth: windowSize.width - 700, overflow: "auto" }}>
          <Grid item xs={6}>
            {corLoop.map((loop, index) => {
              return (
                <Button
                  onClick={() => {
                    setSelectCorMini({ loop, index });
                    setIsOpenDialog(true);
                  }}
                  variant="outlined"
                >
                  {loop.name}
                </Button>
              );
            })}
          </Grid>
        </Paper>
      </Grid>
      <Dialog
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Assign Seconds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign selected mini choreography to another second.
          </DialogContentText>
          <DialogContentText>
            {textTime}-{textTime + minicorLength * 2}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Mini Cor Name"
            type="email"
            name="startTime"
            fullWidth
            onChange={TextInputSecond}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            value={textTime}
          />

          <Button onClick={() => onChangeChoreography()} color="primary">
            Apply
          </Button>

          <Button onClick={() => tryCorLoop()} color="primary">
            Try Live
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onDeleteMiniCor()} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {isConsoleActive && <Controller />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  corLoop: state.corLoop,
  corData: state.corData,
  songCor: state.songCor,
  selectedSeconds: state.selectedSeconds,
  socket: state.socket,
  isSmokeActive: state.isSmokeActive,
  isLiveTry: state.isLiveTry,
  user: state.current_user,
  selectedSecond: state.selectedSecond,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCorLoop: (corLoop) => dispatch({ type: actionTypes.COR_LOOP, corLoop }),
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
    setIsLiveTry: (isLiveTry) =>
      dispatch({ type: actionTypes.IS_LIVE_TRY, isLiveTry }),
    setIsSmokeActive: (isSmokeActive) =>
      dispatch({ type: actionTypes.IS_SMOKE_ACTIVE, isSmokeActive })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCorGroup);
