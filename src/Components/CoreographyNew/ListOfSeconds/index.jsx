import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  List,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import * as actionTypes from "../../../store/actions/actionTypes";
import SecondItem from "./SecondItem";
import { withStyles } from "@material-ui/styles";
import { tryRegulatorCorLoop } from "../../../utils";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";



const milisToMinutesAndSecondsToClearly = (mil) => {
  let minutes = Math.floor(mil / 60000);
  let seconds = ((mil % 60000) / 1000).toFixed(0);
  let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
  return Array.from(Array(Math.round(secondsOfSum/2)).keys())
};



const useStyles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#DE675F",
      // outline: '1px solid slategrey'
    },
  },
  button: {
    backgroundColor: "#66B2FF",
    "&$selected": {
      backgroundColor: "#4994DE",
    },
    "&:hover": {
      backgroundColor: "#4994DE",
    },
    "&$selected:hover": {
      backgroundColor: "#4994DE",
    },
  },
});
const ListOfSeconds = ({
  // clearSecondList,
  classes,
  selectedSeconds,
  songCor,
  setAddSongCor,
  socket,
  isLiveTry,
  settings,
  setSongCor,
  durationStamps
}) => {
  const [windowSize, setWindowSize] = useState({
    width: 1000,
    height: 1000,
  });
  const [isOpenSavePopUp, setIsOpenSavePopUp] = useState(false);
  const [miniCorName, setMiniCorName] = useState("");
  const [clearSecondList, setClearSecondList] = useState([]);
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
    const clearSecond=  milisToMinutesAndSecondsToClearly(durationStamps)
    setClearSecondList(clearSecond)

  }, [durationStamps])

  
  if (!clearSecondList) {
    return null;
  }

  const onClickTyr = () => {
    const tryLoop = tryRegulatorCorLoop({
      selectedSeconds,
      songCor,
      smoke: false,
      robotModel: isLiveTry.robotModel,
    });
    let stringCSV = JSON.stringify({ corData: tryLoop });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: 2,
    };
    socket.emit("corData", encodedString);
  };
  const onClickSave = () => {
    const miniCor = selectedSeconds.map((sec) => {
      return { ...songCor[sec] };
    });

    const miniCorAdd = Object.assign({
      name: miniCorName,
      miniCor,
    });
    setAddSongCor({ ...miniCorAdd });
    setMiniCorName("");
    setIsOpenSavePopUp(false);
  };

  const addSeconds = () => {
    const newClearSecondList =  [...clearSecondList]
    newClearSecondList.push(clearSecondList.length)
    const newSongCor = [...songCor];
    newSongCor.push({
      startDate: newSongCor.length,
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
          rColor3: 0,
          Lhex: "#000000",
          Rhex: "#000000",
        },
      },
      smoke: false,
    });
    console.log("clearSecondList",clearSecondList)
    setSongCor(newSongCor);
    setClearSecondList(newClearSecondList)
  };

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <Paper
        style={{
          maxHeight: windowSize.height - 340,
          overflow: "auto",
          backgroundColor: "#001e3c",
        }}
      >
        <List>
          {clearSecondList &&
            Array.isArray(clearSecondList) &&
            clearSecondList.map((value, index) => {
              return (
                <SecondItem value={value} index={index} classes={classes} />
              );
            })}
        </List>
        {settings && settings.isMakeCor && (
          <IconButton
            color="primary"
            aria-label="add to seconds"
            onClick={() => addSeconds()}
          >
            <AddCircleIcon />
          </IconButton>
        )}
      </Paper>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {selectedSeconds &&
          Array.isArray(selectedSeconds) &&
          selectedSeconds.length > 0 && (
            <>
              <Stack spacing={5} direction="row" style={{ paddingTop: "5vh" }}>
                <Button
                  variant="contained"
                  className={classes.button}
                  // color="primary"
                  onClick={() => onClickTyr()}
                >
                  Try Selected
                </Button>
                <Button
                  variant="contained"
                  // color="primary"
                  className={classes.button}
                  onClick={() => setIsOpenSavePopUp(true)}
                >
                  Save Selected
                </Button>
              </Stack>
            </>
          )}
        <Dialog
          open={isOpenSavePopUp}
          onClose={() => setIsOpenSavePopUp(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Selected</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give a name to moves from selected seconds to other seconds.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Mini Chr. Name"
              type="email"
              fullWidth
              onChange={(e) => setMiniCorName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpenSavePopUp(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => onClickSave(e)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  durationStamps: state.durationStamps,
  selectedSeconds: state.selectedSeconds,
  selectedSecond: state.selectedSecond,
  songCor: state.songCor,
  socket: state.socket,
  isLiveTry: state.isLiveTry,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  setAddSongCor: (miniCor) =>
    dispatch({ type: actionTypes.COR_LOOP_ADD, miniCor }),
  setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ListOfSeconds));
