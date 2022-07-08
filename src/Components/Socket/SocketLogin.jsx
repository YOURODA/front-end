import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import socketIo from "socket.io-client";

const SocketLogin = ({ isSmokeActive, setSmokeTemperature, setSocketIO }) => {
  const [timer, setTimer] = useState(0);
  const socketio_url = localStorage.getItem("localIp") + ":8080/odaName";
  let odaNameLocal = localStorage.getItem("odaName");
  let interval;

  const joinRoom = async (_socket) => {
    _socket.emit("join", { name: odaNameLocal });
    await _socket.on("join", (data) => {
      interval = data.msg;
    });
  };


  const askTemperature = async (_socket) => {
    // // if (currentUser && currentUser.email && socketa && socketa.id) {
    if (interval !== null) {

      _socket.emit("askTemperature", { isSmokeActive: false, odaNameLocal });
      await _socket.on("temperature", (data) => {
        console.log("temperature in the oda", data.temperature);
        setSmokeTemperature(data.temperature);
      });
    }
  };

  useEffect(() => {
    const _socket = socketIo(`${socketio_url}`);
    setSocketIO(_socket);
    joinRoom(_socket);
    askTemperature(_socket);
    window.setTimeout(() => {
      setTimer(time=> time+1)
    }, 10000);
    return () => {
      // window.clearInterval(interval);
      _socket.close();
    };
  }, [timer,isSmokeActive]);


  return null;
};

const mapStateToProps = (state) => {
  return {
    isSmokeActive: state.isSmokeActive,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSocketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
    setSmokeTemperature: (smokeTemperature) =>
      dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SocketLogin);
