import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import ReadController from "./ReadController";

function Controller(props) {

  
  return (
    <div>
      <ReadController redux={props}  />
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
