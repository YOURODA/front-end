import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import { useStyles } from "./useStyles";
import * as actionTypes from "../../../store/actions/actionTypes";
import APIServices from "../../Services/APIServices";
import SelectedDevicePopUp from "../../CoreographyNew/SelectedDevicePopUp";
import { tableIcons } from "./tableIcons";
import { getCore, milisToMinutesAndSeconds } from "./functions";
import { regulatorCorLoop } from "../../../utils";
import { Grid, Card } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import useLocalStorage from "../../../hooks/useLocalStorage";
import RatingCor from "../../RatingCor"
import Skeleton from '@mui/material/Skeleton';

const AllChoreographiesTable = ({
  setIsReturnMusic,
  setCurrentTrackId,
  popUpAll,
  userId,
  durationStamps,
  socket,
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
  const apiService = new APIServices();
  const history = useHistory();

  useEffect(() => {
    console.log("popUpAll",popUpAll)
    setLoading(true)
    switch (popUpAll) {
      case "All":
        console.log("get all api");
        apiService.getAllCoreographies().then((response) => {
          console.log("response", response);
          setLoading(false)
          setAllCorData(getCore(response.data.cor));
        });
        break;
      case "My":
        apiService.getMyCoreographies(userId).then((response) => {
          setAllCorData(getCore(response.data.cor));
        });
        break;
      case "Hit":
        apiService.getHitsCoreographies().then((response) => {
          setAllCorData(getCore(response.data.cor));
        });
        break;
      default:
    }
  }, []);
  const closeSelectDevicePopUp = () => {
    setSelectedDevicePopUp(false);
  };
  const goToEditPage = useCallback(
    () => history.push("/make-coreography"),
    [history]
  );

  const goParty = (id) => {
    let tryCor;
    if (version === "v.1.0") {
      tryCor = regulatorCorLoop({ songCorLoop: choreograph, smoke: false });
    } else {
      tryCor = choreograph;
    }

    closeSelectDevicePopUp();
    setCurrentTrackId(selectTrackId);

    let stringCSV = JSON.stringify({ corData: tryCor });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: milisToMinutesAndSeconds(durationStamps),
    };
    socket.emit("corData", encodedString);
    setIsReturnMusic(id);
  };

  return (
    <div>
      {selectedDevicePopUp && (
        <SelectedDevicePopUp
          send={(id) => goParty(id)}
          onClose={closeSelectDevicePopUp}
        />
      )}

      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Card>
          <MaterialTable
            icons={tableIcons}
            title=" "
            columns={[
              { title: "Track Name", field: "trackName" },
              { title: "Coreography Name", field: "name" },
              {
                title: "Coreography Date",
                field: "date",
              },
              popUpAll === "My"
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
                      console.log(rowData);
                      return <RatingCor rowData={rowData} />;
                    },
                  },
            ]}
            data={getAllCorData}
            actions={[
              {
                icon: () => <PlayArrowIcon />,
                tooltip: "Play Careografy",
                onClick: (event, rowData) => {
                  setSelectTrackId(rowData.trackId);
                  setSelectedDevicePopUp(true);
                  setChoreograph(rowData.file);
                  setVersion(rowData.version);
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: false,
              exportDelimiter: ",\t",
              exportButton: false,
              exportFileName: "Rapor",
              headerStyle: { backgroundColor: "#EAEDED" },
            }}
            isLoading={loading}
            components={{
              OverlayLoading: () =>(<div style={{paddingTop:"50%"}}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              </div> )
            }}
          />
        </Card>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // popUpAll: state.popUpAll,
    userId: state.userId,
    durationStamps: state.durationStamps,
    socket: state.socket,
    isReturnMusic: state.isReturnMusic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setCreateCorPopup: (createCorPopup) =>
      dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup }),
    setIsReturnMusic: (isReturnMusic) =>
      dispatch({ type: actionTypes.IS_RETURN_MUSIC, isReturnMusic }),
    setCurrentTrackId: (currentTrackId) =>
      dispatch({ type: actionTypes.CURRENT_TRACK_ID, currentTrackId }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AllChoreographiesTable));
