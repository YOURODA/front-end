import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import APIServices from "../Services/APIServices";
import SpotifyAPIServices from "../Services/SpotifyAPIServices";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

import { styled } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ListItemButton from "@mui/material/ListItemButton";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { purple } from "@mui/material/colors";

const changeDateFormat = (date) => {
  const d = new Date(date);
  return (
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(":")
  );
};

const EditCorLocalStorage = ({
  setCurrentTrackId,
  setSongCor,
  setIsReturnMusic,
  currentUser,
  setCorInfo,
}) => {
  const [corLocalStorage, setCorLocalStorage] = useState([]);
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
    apiService
      .getMyEditableCors(getLocalDbEditCor)
      .then((response) => {
        console.log("getMyEditingCor", response);
        if (response?.data?.cor.length > 0) {
          setCorLocalStorage(response.data.cor);
        }
        setOpen(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
    spotifyService
      .getDeviceList(currentUser.access_token)
      .then((response) => {
        const activeDevice = response.data.devices.find(
          (device) => device.is_active
        );
        console.log("activeDevice", activeDevice);
        setDevice(activeDevice);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const continueCor = (selectCor) => {
    if (selectCor >= 0) {
      setLocalDbEditCor(corLocalStorage[selectCor]._id);
      setCorInfo(corLocalStorage[selectCor]);
      setCurrentTrackId(corLocalStorage[selectCor].trackId);
      setSongCor(corLocalStorage[selectCor].file);
      setIsReturnMusic(device.id);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  if (corLocalStorage.length === 0) return null;

  console.log("getLocalDbEditCor", getLocalDbEditCor);
  console.log("corLocalStorage After if", corLocalStorage);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          // onClose={handleClose}
        >
          Continue Choreograph
        </DialogTitle>

        <List sx={{ pt: 0 }}>
          {corLocalStorage.map((cor, index) => {
            return (
              <ListItemButton
                selected={cor._id === getLocalDbEditCor}
                onClick={() => continueCor(index)}
                key={cor.name}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: purple[300], color: purple[700] }}>
                    <FileOpenIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={cor.name}
                  secondary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {cor.trackName}
                      </Typography>
                      <Typography>{changeDateFormat(cor.updatedAt)}</Typography>
                    </div>
                  }
                />
              </ListItemButton>
            );
          })}
          <ListItemButton
            autoFocus
            selected={false}
            onClick={() => continueCor(-1)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: purple[300], color: purple[700] }}>
                <OpenInNewIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New" />
          </ListItemButton>
        </List>
     
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.current_user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
    setCorInfo: (corSaveInfo) =>
      dispatch({ type: actionTypes.SET_COR_INFO, corSaveInfo }),
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