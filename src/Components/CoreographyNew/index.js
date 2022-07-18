import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import { useStyles } from "./useStyles";
import * as actionTypes from "../../../store/actions/actionTypes";
import APIServices from "../../Services/APIServices";
import { tableIcons } from "./tableIcons";
import { getCore, milisToMinutesAndSeconds } from "./functions";
import { regulatorCorLoop } from "../../../utils";
import { Grid, Card } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import useLocalStorage from "../../../hooks/useLocalStorage";
import RatingCor from "../../RatingCor";
import CorSettingsMenu from "../CorSettingsMenu/CorSettingsMenu";
import SelectedDevicePopUp from "../../CoreographyNew/SelectedDevicePopUp";
import socketIo from "socket.io-client";

let interval;
const PlayChoreographiesTable = ({
  setIsReturnMusic,
  setCurrentTrackId,
  popUpAll,
  userId,
  durationStamps,
  socket,
  playChoreographyScreen,
  list,
  setList,
  isSmokeActive,
  setSmokeTemperature,
  setSocketIO,
  setSelectedTrackIds,
}) => {
  const [loading, setLoading] = useState(false);
  const [getAllCorData, setAllCorData] = useState([]);
  const [selectedDevicePopUp, setSelectedDevicePopUp] = useState(false);
  const [selectTrackId, setSelectTrackId] = useState("");
  const [choreograph, setChoreograph] = useState(null);
  const [version, setVersion] = useState(null);
  const [getLocalDbEditCor, setLocalDbEditCor] = useLocalStorage(
    "editCorId",
    ""
  );
  const socketio_url = localStorage.getItem("localIp") + ":8080/odaName";
  let odaNameLocal = localStorage.getItem("odaName");
  const apiService = new APIServices();
  const history = useHistory();
  let tryCor;
  let stringCSV;
  //isYourList:false,selected:"All"
  const { isYourList, selected } = playChoreographyScreen;
  const getUserCorListAll = async () => {
    await apiService
      .getUserCorListAll()
      .then((response) => {
        if (response.status === 200) {
          console.log("Create New List", response.data);
          setList(response.data);
        }
      })
      .catch((err) => {
        console.log("sentReviews Err", err);
      });
  };
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
    if (interval !== null) {
      console.log("interval", interval);
      _socket.emit("askTemperature", { isSmokeActive, odaNameLocal });
      await _socket.on("temperature", (data) => {
        console.log("temperature in the oda", data.temperature);
        setSmokeTemperature(data.temperature);
      });
    }
  };

  // const socketRequest = async () => {
  //   socket.on("corData", (data) => {
  //     // if()
  //     console.log("sıracı 2", data.message);
  //     if (version === "v.1.0") {
  //       tryCor = regulatorCorLoop({ songCorLoop: choreograph, smoke: false });
  //     } else {
  //       tryCor = choreograph;
  //     }
  //     stringCSV = JSON.stringify({ corData: tryCor });

  //     const encodedString = {
  //       isStop: 0,
  //       base: new Buffer(stringCSV).toString("base64"),
  //       time: milisToMinutesAndSeconds(durationStamps),
  //       odaNameLocal: localStorage.getItem("odaName"),
  //     };
  //     // setTimeout(() => {
  //       console.log("sıracı 3", encodedString);
  //       socket.emit("corData", encodedString);
  //     // }, 5000);
  //   });
  // };

  // useEffect(() => {
  //   if (socket && socket.on) {
  //      socketRequest();
  //   }
  // }, [socket]);

  useEffect(() => {
    getUserCorListAll();
    const _socket = socketIo(`${socketio_url}`);
    setSocketIO(_socket);
    joinRoom(_socket);
    interval = setInterval(() => askTemperature(_socket), 10000);
    return () => {
      _socket.close();
    };
  }, []);
  useEffect(() => {
    console.log("selected", selected);
    setLoading(true);
    if (!isYourList) {
      switch (selected) {
        case "All":
          console.log("get all api");
          apiService.getAllCoreographies().then((response) => {
            setLoading(false);
            setAllCorData(getCore(response.data.cor));
          });
          break;
        case "My":
          apiService.getMyCoreographies(userId).then((response) => {
            setLoading(false);
            setAllCorData(getCore(response.data.cor));
          });
          break;
        case "Hit":
          apiService.getHitsCoreographies().then((response) => {
            setLoading(false);
            setAllCorData(getCore(response.data.cor));
          });
          break;
        default:
      }
    } else {
      const findList = list
        .find((item) => item.name === selected)
        .list.map((item) => item.ChoreographyId);
      console.log("findList", findList);
      setLoading(false);
      setAllCorData(getCore(findList));
    }
  }, [selected, list]);
  const closeSelectDevicePopUp = () => {
    setSelectedDevicePopUp(false);
  };
  const goToEditPage = useCallback(
    () => history.push("/create-party"),
    [history]
  );

  const goParty = (id) => {
    console.log("goParty", id);

    if (version === "v.1.0") {
      tryCor = regulatorCorLoop({ songCorLoop: choreograph, smoke: false });
    } else {
      tryCor = choreograph;
    }

    closeSelectDevicePopUp();
    setCurrentTrackId(selectTrackId);

    stringCSV = JSON.stringify({ corData: tryCor });
    const encodedString = {
      isStop: 0,
      base: new Buffer(stringCSV).toString("base64"),
      time: milisToMinutesAndSeconds(durationStamps),
      odaNameLocal: localStorage.getItem("odaName"),
    };
    socket.emit("corData", encodedString);
    console.log("sıracı 1");

    setIsReturnMusic(id);
  };

  return (
    <Grid
      style={{
        backgroundColor: "#001e3c",
        paddingLeft: "20vh",
        minHeight: "45vw",
      }}
    >
      {selectedDevicePopUp && (
        <SelectedDevicePopUp
          send={(id) => goParty(id)}
          onClose={closeSelectDevicePopUp}
        />
      )}
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <MaterialTable
          style={{ backgroundColor: "#66B2FF" }}
          icons={tableIcons}
          title=" "
          columns={[
            { title: "Track Name", field: "trackName" },
            { title: "Choreography Name", field: "name" },
            {
              title: "Choreography Date",
              field: "date",
            },
            selected === "My"
              ? {
                  title: "Share",
                  field: "isShared",
                  render: (rowData) => {
                    console.log(rowData);
                    if (!rowData.isShared && rowData._id) {
                      return (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <Edit
                            onClick={(e) => {
                              setLocalDbEditCor(rowData._id);
                              goToEditPage();
                            }}
                          />
                        </IconButton>
                      );
                    }
                    return <Check />;
                  },
                }
              : {
                  title: "Rating",
                  field: "rating",
                  render: (rowData) => {
                    return <RatingCor rowData={rowData} />;
                  },
                },
            {
              title: "Settings",
              field: "rating",
              render: (rowData) => {
                return <CorSettingsMenu rowData={rowData} />;
              },
            },
          ]}
          data={getAllCorData}
          actions={[
            {
              icon: () => <PlayArrowIcon />,
              // tooltip: "Play Choreography",
              onClick: (event, rowData) => {
                // setSelectTrackId(rowData.trackId);
                setSelectedDevicePopUp(true);
                setChoreograph(rowData.file);
                setVersion(rowData.version);
                setSelectedTrackIds(rowData.trackId);
              },
            },
          ]}
          options={{
            pageSize: 8,
            // search: false
            // exportDelimiter: ",\t",
            // exportButton: false,
            // exportFileName: "Rapor",
            headerStyle: { backgroundColor: "#66B2FF" },
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    // popUpAll: state.popUpAll,
    userId: state.userId,
    durationStamps: state.durationStamps,
    socket: state.socket,
    isReturnMusic: state.isReturnMusic,
    playChoreographyScreen: state.playChoreographyScreen,
    list: state.list,
    isSmokeActive: state.isSmokeActive,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSocketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setCreateCorPopup: (createCorPopup) =>
      dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup }),
    setIsReturnMusic: (isReturnMusic) =>
      dispatch({ type: actionTypes.IS_RETURN_MUSIC, isReturnMusic }),
    setCurrentTrackId: (currentTrackId) =>
      dispatch({ type: actionTypes.CURRENT_TRACK_ID, currentTrackId }),
    setList: (list) => dispatch({ type: actionTypes.SET_LIST, list }),
    setSelectedTrackIds: (selectedTrackIds) =>
      dispatch({ type: actionTypes.SET_SELECTED_TRACK_IDS, selectedTrackIds }),
    setSmokeTemperature: (smokeTemperature) =>
      dispatch({ type: actionTypes.SMOKE_TEMPERATURE, smokeTemperature }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PlayChoreographiesTable));