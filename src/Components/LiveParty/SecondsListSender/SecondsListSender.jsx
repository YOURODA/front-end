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
}) => {
  const changeSecondCoreSeconds = (seconds) => {
    setSecondsQueue({ ...secondsQueue, seconds });
  };

  useEffect(() => {
    const timeout = (settings.livePartyWaitSeconds || 2) * 1000;
    const { liveCor, seconds } = secondsQueue;
    console.log("isLiveTry",isLiveTry)
    const { robotModel, localOdaIp } = isLiveTry;
    if (localOdaIp) {
      if (secondsQueue.liveCor.length > 0) {
        const secondCor = liveCor[seconds];

        const regularCor = regulatorCorTry({
          cor: secondCor,
          robotModel,
        });
        console.log("regularCor", regularCor);
        apiServices
          .liveTry({ odaIP: localOdaIp, cor: regularCor })
          .then((response) => {
            if (response.status === 200) {
              console.log("response", response);
            }
          });
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSecondsQueue: (secondsQueue) =>
      dispatch({ type: actionTypes.SET_SECOUNDS_QUEUE, secondsQueue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondsListSender);
