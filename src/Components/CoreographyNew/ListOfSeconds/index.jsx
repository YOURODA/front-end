import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
} from "@material-ui/core";
import * as actionTypes from "../../../store/actions/actionTypes";
import SecondItem from "./SecondItem";
import { tryRegulatorCorLoop } from "../../../utils";

const ListOfSeconds = ({
  clearSecondList,
  classes,
  selectedSeconds,
  songCor,
  setAddSongCor,
  socket
}) => {
  const [windowSize, setWindowSize] = useState({
    width: 1000,
    height: 1000,
  });
  const [isOpenSavePopUp, setIsOpenSavePopUp] = useState(false);
  const [miniCorName, setMiniCorName] = useState("");
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

  if (!clearSecondList) {
    return null;
  }

  const onClickTyr = () => {
    const tryLoop = tryRegulatorCorLoop({ selectedSeconds, songCor, smoke: false });
    let stringCSV = JSON.stringify({ corData: tryLoop });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: 2,
    };
    socket.emit("corData", encodedString)
  };
  const onClickSave = () => {
    const miniCor = selectedSeconds.map((sec) => {
     return {...songCor[sec]}
    })

    const miniCorAdd = Object.assign({
      name: miniCorName,
      miniCor
    });
    setAddSongCor({ ...miniCorAdd });
    setMiniCorName("");
    setIsOpenSavePopUp(false);
  };
  

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <Paper style={{ maxHeight: windowSize.height - 340, overflow: "auto" }}>
        <List>
          {clearSecondList &&
            Array.isArray(clearSecondList) &&
            clearSecondList.map((value, index) => {
              return (
                <SecondItem value={value} index={index} classes={classes} />
              );
            })}
        </List>
      </Paper>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="Full-width contained primary button group"
        >
          {selectedSeconds &&
            Array.isArray(selectedSeconds) &&
            selectedSeconds.length > 0 && (
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setIsOpenSavePopUp(true)}
                >
                  Save Selected
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onClickTyr()}
                >
                  Try Selected
                </Button>
              </div>
            )}
        </ButtonGroup>
        <Dialog
          open={isOpenSavePopUp}
          onClose={() => setIsOpenSavePopUp(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Selected</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Name to add moves from selected seconds to other seconds.
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
  selectedSeconds: state.selectedSeconds,
  selectedSecond: state.selectedSecond,
  songCor: state.songCor,
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  setAddSongCor: (miniCor) =>
    dispatch({ type: actionTypes.COR_LOOP_ADD, miniCor }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfSeconds);
