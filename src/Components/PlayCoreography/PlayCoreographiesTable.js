import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { Grid, Card } from '@material-ui/core';
import APIServices from '../Services/APIServices';
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
    };
    this.apiService = new APIServices();
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
  render() {
    const { classes } = this.props;
    return (
      <div>
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
                },
              ]}
              data={this.state.getAllCorData}
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
    userId: state.userId
  };
};
export default connect(
  mapStateToProps,
  null
)(withStyles(useStyles)(AllCoreographiesTable));
