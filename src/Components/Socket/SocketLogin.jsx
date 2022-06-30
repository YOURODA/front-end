import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import socketIo from "socket.io-client";

const SocketLogin = ({ isSmokeActive, setSmokeTemperature, setSocketIO }) => {
  const socketio_url = localStorage.getItem("localIp") + ":8080/odaName";
  let odaNameLocal = localStorage.getItem("odaName");
  let interval;

  const joinRoom = async (_socket) => {
    console.log("joine geldi");
    _socket.emit("join", { name: odaNameLocal });
    await _socket.on("join", (data) => {
      console.log("data.msg: ", data.msg);
      interval = data.msg;
    });
  };

  const askTemperature = async (_socket) => {
    console.log("asktemperatureeee");
    // // if (currentUser && currentUser.email && socketa && socketa.id) {
    if (interval !== null) {
      console.log("interval", interval);
      console.log("isSmokeActive", { isSmokeActive, odaNameLocal });
      _socket.emit("askTemperature", { isSmokeActive, odaNameLocal });
      await _socket.on("temperature", (data) => {
        console.log("temperature in the oda", data.temperature);
        setSmokeTemperature(data.temperature);
      });
    }
  };

  useEffect(() => {
    const _socket = socketIo(`${socketio_url}`);
    console.log("_socket", _socket);
    setSocketIO(_socket);
    joinRoom(_socket);
    interval = setInterval(() => askTemperature(_socket), 10000);
    return () => {
      _socket.close();
    };
  }, [setSocketIO]);

  useEffect(() => {
      
  
  }, [])
  

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
