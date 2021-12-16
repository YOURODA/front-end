import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";

let newSongCor = [];
export const AxesActions = (props) => {
  const { selectedSecond: time, songCor, setSongCor, getAxes } = props;
  newSongCor = songCor;
  useEffect(() => {
    const intervalId = setInterval(() => {
      const { oldAxes, press } = getAxes();
      const oldRobotString = JSON.stringify(newSongCor);
      let newRobot = JSON.parse(oldRobotString);
      if (oldAxes && oldAxes.length === 4) {
        if (press.length === 0) {
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
        } else if (
          press.length === 1 &&
          (press[0].index === 4 || press[0].index === 5)
        ) {
          const robot = press[0].index === 4 ? "L" : "R";
          if (oldAxes[0] > 0.2 || oldAxes[0] < -0.2) {
            const Blinker =
              newRobot[time].robot[`${robot}Blinker`] + ~~(oldAxes[0] * 30);
            newRobot[time].robot[`${robot}Blinker`] =
              Blinker < 255 && Blinker > 0
                ? Blinker
                : newRobot[time].robot[`${robot}Blinker`];
          }
          if (oldAxes[1] > 0.2 || oldAxes[1] < -0.2) {
            const Brightness =
              newRobot[time].robot[`${robot}Brightness`] - ~~(oldAxes[1] * 30);
            newRobot[time].robot[`${robot}Brightness`] =
              Brightness < 255 && Brightness > 0
                ? Brightness
                : newRobot[time].robot[`${robot}Brightness`];
          }
          if (oldAxes[2] > 0.2 || oldAxes[2] < -0.2) {
            const Speed =
              newRobot[time].robot[`${robot}Speed`] + ~~(oldAxes[2] * 30);
            console.log(Speed)
            newRobot[time].robot[`${robot}Speed`] =
              Speed < 255 && Speed > 0
                ? Speed
                : newRobot[time].robot[`${robot}Speed`];
          }
        }
      }
      setSongCor(newRobot);
    }, 100);
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
