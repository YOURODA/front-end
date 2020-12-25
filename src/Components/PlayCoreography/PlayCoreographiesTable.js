import React, { Component } from 'react';
import * as actionTypes from "../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { Grid, Card } from '@material-ui/core';
import APIServices from '../Services/APIServices';
import SelectedDevicePopUp from "../CoreographyNew/SelectedDevicePopUp";
const useStyles = (theme) => ({
  root: {
    flexGrow: 2,
    padding: '10px',
    textAlign: 'center',
  },
  formTop: {
    paddingTop: '17px',
  },
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '50vh',
  },
  palette: {
    primary: '#ff1744',
    secondary: '#2196f3',
  },
  color: {
    color: '#FF935C',
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
      selectedDevicePopUp:false,
      selectTrackId:""
    };
    this.apiService = new APIServices();
  }

  openSelectDevicePopUp=()=>{
    this.setState({selectedDevicePopUp:true})
  }
  closeSelectDevicePopUp=()=>{
    this.setState({selectedDevicePopUp:false})
  }
  componentDidMount() {
    const { popUpAll } = this.props;
    switch (popUpAll) {
      case 'All':
        this.apiService.getAllCoreographies().then((response) => {
          this.setState({ getAllCorData: response.data.cor });
        });
        break;
      case 'My':
        this.setState(this.state.getAllCorData);
        this.apiService.getMyCoreographies(this.props.userId).then((response) => {
          this.setState({ getAllCorData: response.data.cor });
        });
        break;
      case 'Hit':
        this.setState(this.state.getAllCorData);
        this.apiService.getHitsCoreographies().then((response) => {
          this.setState({ getAllCorData: response.data.cor });
        });
        break;
      default:
    }
  }
  goParty = (id) => {
    this.closeSelectDevicePopUp()
    const { corData } = this.state;
    console.log("cordata", corData);
    let stringCSV = JSON.stringify({ corData });
    const encodedString = {
      base: new Buffer(stringCSV).toString("base64"),
      time: this.milisToMinutesAndSeconds(this.props.durationStamps),
    };
    this.props.socket.emit("corData", encodedString);
    this.props.setCorData(this.state.corData);
    this.props.setIsReturnMusic(id);
    console.log("id go party",id)
  };

  render() {
    const { classes } = this.props;
    const { selectedDevicePopUp } = this.state;
    return (
      <div>
        {selectedDevicePopUp && <SelectedDevicePopUp send={(id)=> this.goParty(id)} onClose={this.closeSelectDevicePopUp} /> }
       
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Card>
            <MaterialTable
              tableRef={this.tableRef}
              title=" "
              columns={[
                { title: 'User Name', field: '' },
                { title: 'Track Name', field: 'trackName' },
                { title: 'Coreography Name', field: 'name' },
                {
                  title: 'Coreography Date',
                  field: 'createdAt',
                }
              ]}
              data={this.state.getAllCorData}
              actions={[
                {
                  icon: 'save',
                  tooltip: 'Save User',
                  onClick: (event, rowData) =>{
                    this.setState({selectTrackId:rowData.trackId})
                    this.setState({selectedDevicePopUp:true})
                    console.log("row",rowData)
                  } 
                }
              ]}
              options={{
                pageSize: 10,
                search: false,
                exportDelimiter: ',\t',
                exportButton: false,
                exportFileName: 'Rapor',
                headerStyle: { backgroundColor: '#EAEDED' },
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
    isReturnMusic: state.isReturnMusic
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorData: corData => dispatch({ type: actionTypes.COR_DATA, corData }),
    setCreateCorPopup: createCorPopup => dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup }),
    setCorData: (corData) => dispatch({ type: actionTypes.COR_DATA, corData }),
    setColourNumber: (number) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR_NUMBER, number }),
    setColour: (colour) =>
      dispatch({ type: actionTypes.UPDATE_COLOUR, colour }),
    setIsReturnMusic: isReturnMusic =>
      dispatch({ type: actionTypes.IS_RETURN_MUSIC, isReturnMusic })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AllCoreographiesTable));
