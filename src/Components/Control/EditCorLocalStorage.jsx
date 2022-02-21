import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import APIServices from "../Services/APIServices";
import SpotifyAPIServices from "../Services/SpotifyAPIServices";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditCorLocalStorage = ({
  setContinueCor,
  userId,
  setCurrentTrackId,
  setSongCor,
  setIsReturnMusic,
  currentUser,
  setCorInfo}) => {
  const [corLocalStorage, setCorLocalStorage] = useState({});
  const [device, setDevice] = useState({});
  const [open, setOpen] = useState(false);
  const [getLocalDbEditCor, setLocalDbEditCor] = useLocalStorage(
    "editCorId",
    ""
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const apiService = new APIServices();
  const spotifyService = new SpotifyAPIServices();
  useEffect(() => {
    console.log("userID", userId);
    apiService
    .getMyEditingCor(getLocalDbEditCor).then((response) => {
      console.log("getMyEditingCor", response);
      setCorLocalStorage(response.data.cor);
      setOpen(true);
    });
    spotifyService
      .getDeviceList(currentUser.access_token)
      .then((response) => {
        const activeDevice= response.data.devices.find(device=> device.is_active)
        console.log("activeDevice",activeDevice)
        setDevice(activeDevice)
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const continueCor = () => {
    console.log("set redux and song");
    console.log("set cor info fonksiyonu çalıştı",corLocalStorage)
    setCorInfo(corLocalStorage)
    setCurrentTrackId(corLocalStorage.trackId);
    setSongCor(corLocalStorage.file);
    setIsReturnMusic(device.id);
    setOpen(false);
  };

  console.log("CorLocalStorage", corLocalStorage);
  if (!corLocalStorage?.name) return null;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Continue Choreograph
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Name: {corLocalStorage.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={continueCor}>
            Continue Choreograph
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    currentUser: state.current_user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setCorInfo: (corSaveInfo) => dispatch({ type: actionTypes.SET_COR_INFO, corSaveInfo }),
    setCurrentTrackId: (currentTrackId) =>
      dispatch({ type: actionTypes.CURRENT_TRACK_ID, currentTrackId }),
    setIsReturnMusic: (isReturnMusic) =>
      dispatch({ type: actionTypes.IS_RETURN_MUSIC, isReturnMusic }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCorLocalStorage);

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
