import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import APIService from "../../Components/Services/APIServices";
// import CreateCor from "../../Components/CoreographyNew/CreateCor";
import ListOfSeconds from "../../Components/CoreographyNew/ListOfSeconds";
import { withStyles } from "@material-ui/styles";
import AppBarSettings from "../../Components/CoreographyNew/miniCorGroup/AppBarSettings";
import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core";
import RobotOptions from "../../Components/CoreographyNew/RobotOptions";
const useStyles = (theme) => ({
  active: {
    backgroundColor: "#66B2FF",
    height: "50px",
    "&:hover": {
      backgroundColor: "#66B2FF",
    },
  },
  nonActive: {
    backgroundColor: "#001e3c",
    height: "50px",
    "&:hover": {
      backgroundColor: "#66B2FF",
    },
  },
  listSecond: {
    height: "24pt",
  },
});

/*
 *Live parti için Choreografi yapma sayfası
 */

const apiService = new APIService();

const LivePartyCorScreen = ({ setSongCor, songCor, classes }) => {
  const [clearSecondList, setClearSecondList] = useState(
    Array.from(Array(10).keys())
  );

  useEffect(() => {
    // Array.from(Array(this.clearSeconds).keys())

    let newSongCor = new Array(3).fill(0);
    newSongCor = newSongCor.map((cor, index) => {
      return {
        startDate: index,
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
      };
    });
    setSongCor(newSongCor);
  }, []);

  return (
    <>
      {/* <CreateCor/>; */}
      <Grid container style={{ backgroundColor: "#001e3c", height: "100vh" }} >
      test

      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    livePartyCategories: state.livePartyCategories,
    songCor: state.songCor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (livePartyCategories) =>
      dispatch({
        type: actionTypes.LIVE_PARTY_CATEGORIES,
        livePartyCategories,
      }),
    setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LivePartyCorScreen));
