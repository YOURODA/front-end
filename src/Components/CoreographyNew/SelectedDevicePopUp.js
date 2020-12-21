import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SelectedDevicePopUp = (props) => {
  const classes = useStyles();
  const { onClose, selectedValue, user ,send} = props;
  const [deviceList, setDeviceList] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const handleListItemClick = (id,name) => {
    console.log("handleListItemClick name",name);
    console.log("handleListItemClick id",id);
    setOpen(false)
    onClose();
    send(id)
  };

  useEffect(() => {
    axios({
      url: `https://api.spotify.com/v1/me/player/devices`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((data) => {
        setDeviceList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("deviceList", deviceList);
  if (!deviceList) return null
  console.log("deviceList.data", deviceList.data.devices);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Select Device</DialogTitle>
      <List>
        {deviceList.data.devices.map((device) => (
          <ListItem
            button
            onClick={() => handleListItemClick(device.id,device.name)}
            key={device.name}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={device.name} />
            {device.is_active ?"active":"no-active"}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.current_user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    //   setCorData: corData => dispatch({ type: actionTypes.COR_DATA, corData }),
    //   setCreateCorPopup: createCorPopup => dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup }),
    //   setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    //   setColourNumber: (number) =>
    //     dispatch({ type: actionTypes.UPDATE_COLOUR_NUMBER, number }),
    //   setColour: (colour) =>
    //     dispatch({ type: actionTypes.UPDATE_COLOUR, colour }),
    //   setIsReturnMusic: isReturnMusic =>
    //     dispatch({ type: actionTypes.IS_RETURN_MUSIC, isReturnMusic })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedDevicePopUp);
