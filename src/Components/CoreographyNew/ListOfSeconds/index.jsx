import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as actionTypes from "../../../store/actions/actionTypes";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Grid,
  Paper,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./listOfSeconds.module.css";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const ListOfSeconds = ({
  clearSecondList,
  classes,
  setSelectedSeconds,
  selectedSeconds,
  setSelectedSecond,
  selectedSecond,
  songCor,
}) => {
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
  if (!clearSecondList) {
    return null;
  }

  const handleToggleMultiple = (value) => {
    const valueIndex = selectedSeconds.indexOf(value);
    const newSelectedSeconds = [...selectedSeconds];
    if (valueIndex < 0) {
      newSelectedSeconds.push(value);
      setSelectedSeconds(newSelectedSeconds);
    } else {
      newSelectedSeconds.splice(valueIndex, 1);
      setSelectedSeconds(newSelectedSeconds);
    }
  };
  const handleSelectedSecond = (value) => {
    setSelectedSecond(value);
  };
  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <Paper style={{ maxHeight: windowSize.height - 240, overflow: "auto" }}>
        <List>
          {clearSecondList.map((value, index) => {
            const labelId = `button-list-label-${value}`;
            return (
              <div className={classes.demo}>
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={() => handleSelectedSecond(value)}
                  checked={selectedSecond === value}
                  className={
                    selectedSecond === value
                      ? classes.active
                      : classes.nonActive
                  }
                >
                  <Grid container className={classes.listSecond}>
                    <ListItemText primary={`${value * 2} - ${value * 2 + 2}`} />
                    {windowSize.width > 1140 && (
                      <ListItemText primary={`seconds`} />
                    )}

                    {/*
                    <Grid item xs={4}>
                      seconds
                    </Grid> */}
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          backgroundColor: songCor[index].robot.colour.Lhex,
                        }}
                      >
                        {" "}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          backgroundColor: songCor[index].robot.colour.Rhex,
                        }}
                      >
                        {" "}
                      </Avatar>
                    </ListItemAvatar>
                  </Grid>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <GreenCheckbox
                        edge="end"
                        onChange={() => handleToggleMultiple(value)}
                        checked={selectedSeconds.includes(value)}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedSeconds: state.selectedSeconds,
    selectedSecond: state.selectedSecond,
    songCor: state.songCor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedSeconds: (selectedSeconds) =>
      dispatch({ type: actionTypes.SELECTED_SECONDS, selectedSeconds }),
    setSelectedSecond: (selectedSecond) =>
      dispatch({ type: actionTypes.SELECTED_SECOND, selectedSecond }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfSeconds);
