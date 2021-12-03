import React from 'react';
import {decreaseSecond} from "./index";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";

let oldPressButton = [];


export const PressActions = (pressGamePad,redux) => {
  console.log("redux pressActions",redux);
  if (oldPressButton.length === 0) {
    console.log("tek tuşa basıldı", pressGamePad);

    if(pressGamePad.length === 1){
      if(pressGamePad[0].index === 12) {
        decreaseSecond(redux);
      } 
      if(pressGamePad[0].index === 13) {
        console.log("saniyeyi arttır")
      } 
    }

  }
  if (
    oldPressButton.length === 1 &&
    pressGamePad.length === 2 &&
    oldPressButton[0].index === 4 &&
    pressGamePad[0].index === 0
  ) {
    console.log("yeşili aç", pressGamePad);
  }

  oldPressButton = pressGamePad;
  return <div>pressActions</div>;
};
const mapStateToProps = (state) => ({
  isConsoleActive: state.isConsoleActive,
  selectedSeconds: state.selectedSeconds,
  selectedSecond: state.selectedSecond,
  songCore: state.songCore,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedSeconds: (selectedSeconds) =>
    dispatch({ type: actionTypes.SELECTED_SECONDS, selectedSeconds }),
  setSelectedSecond: (selectedSecond) =>
    dispatch({ type: actionTypes.SELECTED_SECOND, selectedSecond }),
  setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PressActions);