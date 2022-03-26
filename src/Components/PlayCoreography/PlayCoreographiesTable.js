import React, { Component, forwardRef ,useState} from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { withStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { Grid, Card } from "@material-ui/core";
import APIServices from "../Services/APIServices";
import SelectedDevicePopUp from "../CoreographyNew/SelectedDevicePopUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { regulatorCorLoop } from "../../utils";
// import useLocalStorage from "../hooks/useLocalStorage";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = (theme) => ({
  root: {
    flexGrow: 2,
    padding: "10px",
    textAlign: "center",
  },
  formTop: {
    paddingTop: "17px",
  },
  dialogPaper: {
    minHeight: "30vh",
    maxHeight: "50vh",
  },
  palette: {
    primary: "#ff1744",
    secondary: "#2196f3",
  },
  color: {
    color: "#FF935C",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 550,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
});


class AllCoreographiesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyDialog: [],
      getAllCorData: [],
      selectedDevicePopUp: false,
      selectTrackId: "",
      coreograph: null,
      socket: null,
      version: "",
    };
    this.apiService = new APIServices();
  }

  
  milisToMinutesAndSeconds = (mil) => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };

  openSelectDevicePopUp = () => {
    this.setState({ selectedDevicePopUp: true });
  };
  closeSelectDevicePopUp = () => {
    this.setState({ selectedDevicePopUp: false });
  };
  getCore = (corall) => {
    return corall.map((res) => {
      const date = new Date(res.updatedAt).toLocaleDateString();
      return { ...res, date };
    });
  };
  componentDidMount() {
    const { popUpAll } = this.props;
    console.log("componentDidMount", popUpAll);
    switch (popUpAll) {
      case "All":
        console.log("get all api");
        this.apiService.getAllCoreographies().then((response) => {
          console.log("response", response);
          this.setState({ getAllCorData: this.getCore(response.data.cor) });
        });
        break;
      case "My":
        this.setState(this.state.getAllCorData);
        this.apiService
          .getMyCoreographies(this.props.userId)
          .then((response) => {
            console.log("response", response);
            this.setState({ getAllCorData: this.getCore(response.data.cor) });
          });
        break;
      case "Hit":
        this.setState(this.state.getAllCorData);
        this.apiService.getHitsCoreographies().then((response) => {
          this.setState({ getAllCorData: this.getCore(response.data.cor) });
        });
        break;
      default:
    }
  }

  goParty = (id) => {
    const { selectTrackId, coreograph } = this.state;
    console.log("coreograph", coreograph);
    let tryCor;
    if (this.state.version === "v.1.0") {
      tryCor = regulatorCorLoop({ songCorLoop: coreograph, smoke: false });
    } else {
      tryCor = coreograph;
    }

    this.closeSelectDevicePopUp();
    this.props.setCurrentTrackId(selectTrackId);
    let stringCSV = JSON.stringify({ corData: tryCor });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: this.milisToMinutesAndSeconds(this.props.durationStamps),
    };
    this.props.socket.emit("corData", encodedString);
    this.props.setIsReturnMusic(id);
    console.log("id go party", id);
  };

  render() {
    const { classes } = this.props;
    const { selectedDevicePopUp } = this.state;
    return (
      <div>
        {selectedDevicePopUp && (
          <SelectedDevicePopUp
            send={(id) => this.goParty(id)}
            onClose={this.closeSelectDevicePopUp}
          />
        )}

        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Card>
            <MaterialTable
              icons={tableIcons}
              tableRef={this.tableRef}
              title=" "
              columns={[
                { title: "Track Name", field: "trackName" },
                { title: "Coreography Name", field: "name" },
                {
                  title: "Coreography Date",
                  field: "date",
                },
                {
                  title: "Share",
                  field: "isShared",
                  render: (rowData) => {
                    console.log(rowData);
                    if (!rowData.isShared && rowData._id) {
                      return (
                        <IconButton
                          color="primary"
                          // aria-label="upload picture"
                          component="span"
                        >
                          <Edit
                            onClick={(e) =>
                              console.log("edit go to id", rowData._id)
                            }
                          />
                        </IconButton>
                      );
                    }else{
                      return <Check />;
                    }
                  },
                },
              ]}
              data={this.state.getAllCorData}
              actions={[
                {
                  icon: () => <PlayArrowIcon />,
                  tooltip: "Play Careografy",
                  onClick: (event, rowData) => {
                    this.setState({ selectTrackId: rowData.trackId });
                    this.setState({ selectedDevicePopUp: true });
                    this.setState({ coreograph: rowData.file });
                    this.setState({ version: rowData.version });
                    console.log("row", rowData);
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
            />
          </Card>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    popUpAll: state.popUpAll,
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
    // setScoketIO: (socket) => dispatch({ type: actionTypes.SOCKET, socket }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AllCoreographiesTable));
