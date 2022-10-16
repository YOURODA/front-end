import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import socketIo from "socket.io-client";
const userApiService = process.env.REACT_APP_BACKEND_URL;

const protocol= process.env.REACT_APP_NODE_ENV==="develop" ? "ws": "wss"
const SocketLogin = ({ isSmokeActive, setSmokeTemperature, setSocketIO, localIp,setIpList ,ipList }) => {
  const [stateSocket, setStateSocket] = useState(null)
  const [timer, setTimer] = useState(0);
  const socketio_url =`${protocol}://${userApiService}`;
  let odaNameLocal = localStorage.getItem("odaName");
  let interval;

  const joinRoom = async (_socket) => {
    console.log("joinRoom 16")
    // socket.emit("hello", { name: "John" });
    _socket.emit("join", { name: "okanserbest" });
    await _socket.on("join", (data) => {
      interval = data.msg;
    });
  };


  const askTemperature = async (_socket) => {
    // // if (currentUser && currentUser.email && socketa && socketa.id) {
    if (interval !== null) {

      _socket.emit("askTemperature", { isSmokeActive: isSmokeActive, odaNameLocal });
      await _socket.on("temperature", (data) => {
        console.log("temperature in the oda", data.temperature);
        setSmokeTemperature(data.temperature);
      });
    }
  };

  useEffect(() => {
    const _socket = socketIo(`${socketio_url}`);
    setSocketIO(_socket);
    joinRoom(_socket)
    setStateSocket(_socket)
    return () => {
      _socket.close();
    };
  }, [])


  useEffect(() => {
    if (stateSocket) {
      askTemperature(stateSocket);
    }
    window.setTimeout(() => {
      setTimer(time => time + 1)
    }, 10000);
  }, [timer, isSmokeActive]);


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
