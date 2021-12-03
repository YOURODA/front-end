import React from "react";
import * as controller from "../../../utils/controller";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";

let oldPressButton = [];

export const PressActions = (props) => {
  const { pressGamePad } = props;
  if (oldPressButton.length === 0) {
    console.log("tek tuşa basıldı", pressGamePad);

    if (pressGamePad.length === 1) {
      if (pressGamePad[0].index === 12) {
        controller.decreaseSecond(props);
      }
      if (pressGamePad[0].index === 13) {
        controller.increaseSecond(props);
      }
      if (pressGamePad[0].index === 15) {
        controller.selectedSeconds(props);
      }
    }
  }
  if (
    oldPressButton.length === 1 &&
    pressGamePad.length === 2 &&
    (oldPressButton[0].index === 4 || oldPressButton[0].index === 5) &&
    (pressGamePad[0].index === 0 ||
      pressGamePad[0].index === 1 ||
      pressGamePad[0].index === 2)
  ) {
    controller.setColour(props, {
      colorPress: pressGamePad,
      robot: oldPressButton[0].index === 4 ? "L" : "R",
    });
    console.log("yeşili aç", pressGamePad);
  }

  oldPressButton = pressGamePad;
  return <div></div>;
};
const mapStateToProps = (state) => ({
  isConsoleActive: state.isConsoleActive,
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

export default connect(mapStateToProps, mapDispatchToProps)(PressActions);
