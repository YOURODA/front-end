import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import { regulatorCorTry } from "../../../utils";
import APIService from "../../Services/APIServices";
import { emptyCor } from "../../../utils/cor/emptyCor";
const apiServices = new APIService();

const SecondsListSender = ({
  setSecondsQueue,
  secondsQueue,
  settings,
  isLiveTry,
  socket
}) => {
  const changeSecondCoreSeconds = (seconds) => {
    setSecondsQueue({ ...secondsQueue, seconds });
  };

  useEffect(() => {
    const timeout = (settings.livePartyWaitSeconds || 2) * 1000;
    const { liveCor, seconds } = secondsQueue;
    console.log("isLiveTry",isLiveTry)
    const { robotModel, localOdaIp,status } = isLiveTry;
    if (status) {
      if (secondsQueue.liveCor.length > 0) {
        const secondCor = liveCor[seconds];

        const regularCor = regulatorCorTry({
          cor: secondCor,
          robotModel,
        });
        const stringCSV = JSON.stringify({ corData: regularCor });
        const encodedString = {
          isStop: 0,
          base: new Buffer(stringCSV).toString("base64"),
          time:0,
          odaNameLocal: localStorage.getItem("odaName"),
        };
        socket.emit("liveTryForRobots", encodedString);
        // socket.emit("liveTryForRobots", regularCor);
        const timeoutID = setTimeout(() => {
          const newSeconds = seconds + 1 < liveCor.length ? seconds + 1 : 0;
          console.log("newSeconds", newSeconds);
          changeSecondCoreSeconds(newSeconds);
        }, timeout);
        return () => window.clearTimeout(timeoutID);
      }
    }
  }, [secondsQueue]);
  return null;
};

const mapStateToProps = (state) => ({
  secondsQueue: state.secondsQueue,
  settings: state.settings,
  isLiveTry: state.isLiveTry,
  socket: state.socket,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSecondsQueue: (secondsQueue) =>
      dispatch({ type: actionTypes.SET_SECOUNDS_QUEUE, secondsQueue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondsListSender);
