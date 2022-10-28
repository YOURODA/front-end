import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import fogMachineActive from "../../../images/fog-machine-active.png";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Grid,
  Paper,
  Popper,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import * as actionTypes from "../../../store/actions/actionTypes";
import Typography from "@material-ui/core/Typography";

import CloudIcon from "@mui/icons-material/Cloud";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";

const GreenCheckbox = withStyles({
  root: {
    color: "#DE675F",
    "&$checked": {
      color: "#DE675F",
    },
  },
})((props) => <Checkbox color="default" {...props} />);

const ListItemTextColor = withStyles({
  root: {
    color: "#6F7E8C",
    "&$selected": {
      color: "#F5F4F4",
    },
    "&:hover": {
      color: "white",
    },
    "&$selected:hover": {
      color: "#001e3c",
    },
  },
})((props) => <ListItemText color="default" {...props} />);

const SecondItem = ({
  value,
  index,
  songCor,
  selectedSeconds,
  selectedSecond,
  setSelectedSecond,
  setSelectedSeconds,
  classes,
  setSongCor,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [windowSize, setWindowSize] = useState({
    width: 1000,
    height: 1000,
  });

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

  const handleToggleMultiple = (value, event) => {
    const valueIndex = selectedSeconds.indexOf(value);
    const newSelectedSeconds = [...selectedSeconds];
    newSelectedSeconds.sort((a, b) => a - b);
    const firstSecond = newSelectedSeconds[0];
    const lastSecond = newSelectedSeconds[newSelectedSeconds.length - 1];

    if (
      newSelectedSeconds.length > 0 &&
      !(
        firstSecond - 1 === value ||
        lastSecond + 1 === value ||
        firstSecond === value ||
        lastSecond === value
      )
    ) {
      setTimeout(() => {
        openPopSequentiallyError(false);
      }, 3000);
      return openPopSequentiallyError(event);
    }
    if (valueIndex < 0) {
      newSelectedSeconds.push(value);
      setSelectedSeconds(newSelectedSeconds);
    } else {
      newSelectedSeconds.splice(valueIndex, 1);
      setSelectedSeconds(newSelectedSeconds);
    }
  };

  const openPopSequentiallyError = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleSelectedSecond = (value) => {
    setSelectedSecond(value);
  };

  const labelId = `button-list-label-${value}`;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const iterableCor = () => {
    if (index !== 0) {
      const newRobot = JSON.parse(JSON.stringify(songCor));
      newRobot[index] = JSON.parse(JSON.stringify(newRobot[index - 1]));
      setSongCor(newRobot);
    }
  };
  const reverseIterableCor = () => {
    if (index + 1 !== songCor.length) {
      const newRobot = JSON.parse(JSON.stringify(songCor));
      newRobot[index] = JSON.parse(JSON.stringify(newRobot[index + 1]));
      setSongCor(newRobot);
    }
  };

  const handleChangeSmoke = (index) => {
    const newRobot = [...songCor];
    newRobot[index].smoke = !songCor[index].smoke;
    setSongCor(newRobot);
  };

  if (
    songCor &&
    Array.isArray(songCor) &&
    songCor[index] &&
    songCor[index].robot &&
    songCor[index].robot.colour &&
    songCor[index].robot.colour.Lhex
  )
    return (
      <div>
        <ListItem
          key={value}
          role={undefined}
          dense
          button
          onClick={() => handleSelectedSecond(value)}
          checked={selectedSecond === value}
          className={
            selectedSecond === value ? classes.active : classes.nonActive
          }
        >
          <Grid container>
            <ListItemTextColor primary={`${value * 2} - ${value * 2 + 2}`} />
            {windowSize.width > 1140 && <ListItemTextColor />}
            <div style={{ marginRight: "15px" }}>
              <Checkbox
                // size="small"
                checked={songCor[index].smoke}
                onChange={() => handleChangeSmoke(index)}
                name="checkSmoke"
                // color="primary"

                icon={<CloudQueueIcon color="primary" />}
                checkedIcon={
                  <CloudRoundedIcon color="primary" fontSize="medium" />
                }
              />
            </div>
            <ListItemAvatar>
              <Avatar
                onClick={() => iterableCor()}
                style={{
                  backgroundColor: songCor[index].robot.colour.Lhex,
                }}
              ></Avatar>
            </ListItemAvatar>
            <ListItemAvatar>
              <Avatar
                onClick={() => reverseIterableCor()}
                style={{
                  backgroundColor: songCor[index].robot.colour.Rhex,
                }}
              ></Avatar>
            </ListItemAvatar>
          </Grid>
          <ListItemSecondaryAction>
            <GreenCheckbox
              edge="end"
              onChange={(event) => {
                handleToggleMultiple(value, event);
              }}
              checked={selectedSeconds.includes(value)}
              inputProps={{ "aria-labelledby": labelId }}
            />
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              <Paper>
                <Typography className={classes.typography}>
                  Please Choose Sequentially
                </Typography>
              </Paper>
            </Popper>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
};

const mapStateToProps = (state) => ({
  selectedSeconds: state.selectedSeconds,
  selectedSecond: state.selectedSecond,
  songCor: state.songCor,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedSeconds: (selectedSeconds) =>
    dispatch({ type: actionTypes.SELECTED_SECONDS, selectedSeconds }),
  setSelectedSecond: (selectedSecond) =>
    dispatch({ type: actionTypes.SELECTED_SECOND, selectedSecond }),
  setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondItem);
