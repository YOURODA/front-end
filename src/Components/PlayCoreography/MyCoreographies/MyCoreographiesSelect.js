import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import { withStyles } from '@material-ui/styles';
import Editor from '../../Editor/Editor';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import myCor from '../../../images/myCor.png';

const useStyles = (theme) => ({
  button: {
    // margin: theme.spacing(1)
  },
});
class MyCoreographiesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCorPopUpCheck: false,
    };
  }
  handleOpen = () => {
    this.props.setPopUpAll('My Coreographie');
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <Button onClick={this.handleOpen}>
            <img src={myCor} />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

// const mapStateToProps = (state) => {
//   // return {
//   // };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    setPopUpAll: (popUpAll) =>
      dispatch({ type: actionTypes.POPUP_ALL, popUpAll }),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(MyCoreographiesSelect));
