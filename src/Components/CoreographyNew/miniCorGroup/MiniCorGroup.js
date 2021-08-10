import React, { useState } from "react";
import { connect } from "react-redux";
// import "./miniCorGroup"
import * as actionTypes from "../../../store/actions/actionTypes";
import styles from "./miniCorGroup.module.css";

import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slider,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
    width: 300 + theme.spacing(3) * 2,
  },
}));

export const MiniCorGroup = (props) => {
  const classes = useStyles();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectCorMini, setSelectCorMini] = useState(null);
  const [selectTime, setSelectTime] = useState(null);
  const { corLoop } = props;

  const startTime = 15;
  const minicorLength = 30;
  const songcorlength = 350;
  const [pushCor, setPushCor] = useState([
    startTime,
    startTime + minicorLength,
  ]);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    const newPushCor = [...pushCor];
    if (newValue[0] === pushCor[0]) {
      newPushCor[1] = newValue[1];
      newPushCor[0] = newValue[1] - minicorLength;
      console.log("newPushCor", newPushCor);
    } else {
      newPushCor[0] = newValue[0];
      newPushCor[1] = newValue[0] + minicorLength;
    }
    setPushCor(newPushCor);
  };

  console.log("corLoop", corLoop);
  if (corLoop.length === 0) {
    return null;
  }

  const onDeleteMiniCor = () => {
    console.log("delete", selectCorMini);
  };
  const onChangeChoreography = () => {
    console.log("change", selectCorMini);
    console.log("setTime", selectTime);
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        {corLoop.map((loop, index) => {
          return (
            <div>
              <Button
                onClick={() => {
                  setSelectCorMini({ loop, index });
                  setIsOpenDialog(true);
                }}
              >
                {loop.name}
              </Button>
            </div>
          );
        })}
      </ButtonGroup>
      <Dialog
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Süreye Ata</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seçilen mini coru şarkı üzerindeki saniyeye atamak için saniye seçip
            değiştire tıklayın
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mini Cor Name"
            type="email"
            fullWidth
            onChange={(e) => setSelectTime(e.target.value)}
          />

          <Slider
            ValueLabelComponent={ValueLabelComponent}
            aria-label="custom thumb label"
            value={pushCor}
            min={0}
            max={songcorlength}
            onChange={handleChange}
          />

          <Button onClick={() => onChangeChoreography()} color="primary">
            Change
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  corLoop: state.corLoop,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCorLoop: (corLoop) => dispatch({ type: actionTypes.COR_LOOP, corLoop }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCorGroup);
