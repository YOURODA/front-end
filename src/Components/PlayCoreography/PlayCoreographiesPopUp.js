import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import PlayChoreographiesTable from './PlayChoreographiesTable';
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
class PlayCoreographiesPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddDialog: false,
      emptyDialog: [],
    };
  }
  handleChange = (event) => {
    this.setState({
      selectedApplicationId: event.target.value.id,
      selectedApplicationNames: event.target.value,
    });
  };
  handleChangeMenu = (event) => {
    this.setState({
      selectedMenuIds: event.target.value.menuId,
      selectedMenuName: event.target.value,
      selectedMenu: event.target,
    });
  };
  handleClose = () => {
    this.props.setPopUpAll('');
  };
  addUser(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  render() {
    const { classes, popUpAll } = this.props;
    return (
      <div>
        <Dialog
          disableBackdropClick
          open={!!popUpAll}
          classes={{ paper: classes.dialogPaper }}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={'md'}
          maxHeight={'md'}
        >
          <DialogTitle className={classes.content} id="form-dialog-title">
            {popUpAll}
          </DialogTitle>
          <DialogContent>
            <PlayChoreographiesTable popUpAll={"All"} />
          </DialogContent>
          <DialogActions>
            <Button style={{ color: 'red' }} onClick={this.handleClose}>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog,
    popUpAll: state.popUpAll,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPopUpAll: (popUpAll) =>
      dispatch({ type: actionTypes.POPUP_ALL, popUpAll }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PlayCoreographiesPopUp));
