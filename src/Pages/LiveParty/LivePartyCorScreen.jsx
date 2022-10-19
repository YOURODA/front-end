import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import {Grid} from "@material-ui/core";
import CreateCor from "../../Components/CoreographyNew/CreateCor";

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

const LivePartyCorScreen = ({
  setDurationStamps,
  setPositionStamp,
  setSettings,
  settings,
}) => {
  // let { categoryId } = useParams();
  // console.log("id",categoryId)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSettings({ ...settings, isMakeCor: true });
    setDurationStamps(4000);
    setPositionStamp(0);
    setLoading(false);
  }, []);
  if (loading) {
    return <>Loading</>;
  }
  return (
    <>
      {/* <CreateCor/>; */}
      <Grid container style={{ backgroundColor: "#001e3c", height: "100vh" }}>
        <CreateCor />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    livePartyCategories: state.livePartyCategories,
    songCor: state.songCor,
    settings: state.settings,
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
    setDurationStamps: (durationStamps) =>
      dispatch({ type: actionTypes.DURATION_STAMP, durationStamps }),
    setPositionStamp: (position_stamp) =>
      dispatch({ type: actionTypes.NOW_POSITION_STAMP, position_stamp }),
    setSettings: (settings) =>
      dispatch({ type: actionTypes.SETTINGS, settings }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePartyCorScreen);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(useStyles)(LivePartyCorScreen));
