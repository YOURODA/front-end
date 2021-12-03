import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
let oldAxes = [];
let newSongCor = [];
export const AxesActions = (props) => {
  const { axes, selectedSecond: time, songCor, setSongCor } = props;
  oldAxes = axes;
  newSongCor = songCor;
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (oldAxes && oldAxes.length === 4) {
        const oldRobotString = JSON.stringify(newSongCor);
        let newRobot = JSON.parse(oldRobotString);
        const LHor = newRobot[time].robot.LHor + ~~(oldAxes[0] * 30);
        const LVer = newRobot[time].robot.LVer - ~~(oldAxes[1] * 50);

        const RHor = newRobot[time].robot.RHor + ~~(oldAxes[2] * 30);
        const RVer = newRobot[time].robot.RVer - ~~(oldAxes[3] * 50);
        newRobot[time].robot.LHor =
          LHor < 255 && LHor > 0 ? LHor : newRobot[time].robot.LHor;
        newRobot[time].robot.LVer =
          LVer < 255 && LVer > 0 ? LVer : newRobot[time].robot.LVer;

        newRobot[time].robot.RHor =
          RHor < 255 && RHor > 0 ? RHor : newRobot[time].robot.RHor;
        newRobot[time].robot.RVer =
          RVer < 255 && RVer > 0 ? RVer : newRobot[time].robot.RVer;

        setSongCor(newRobot);
        oldAxes = [];
      }
    }, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div></div>;
};
const mapStateToProps = (state) => ({
  selectedSecond: state.selectedSecond,
  songCor: state.songCor,
});

const mapDispatchToProps = (dispatch) => ({
  setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AxesActions);
