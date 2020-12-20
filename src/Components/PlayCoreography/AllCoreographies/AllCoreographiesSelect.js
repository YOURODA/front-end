import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import { withStyles } from '@material-ui/styles';
import PlayCoreographiesPopUp from '../PlayCoreographiesPopUp';
import {
  Button,
  Grid,
} from '@material-ui/core';
import allCor from '../../../images/all.png';

const useStyles = (theme) => ({
  button: {
    // margin: theme.spacing(1)
  },
});
class AllCoreographiesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCorPopUpCheck: false,
    };
  }
  handleOpen = () => {
    this.setState({ allCorPopUpCheck: true });
    this.props.setPopUpAll('All');
  };

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Button onClick={this.handleOpen}>
            <img src={allCor} />
          </Button>
          <PlayCoreographiesPopUp />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPopUpAll: (popUpAll) =>
      dispatch({ type: actionTypes.POPUP_ALL, popUpAll }),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(AllCoreographiesSelect));
