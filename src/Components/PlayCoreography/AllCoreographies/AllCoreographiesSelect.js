import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import Editor from '../../Editor/Editor'
import AllCoreographiesPopUp from '../../PlayCoreography/AllCoreographies/AllCoreographiesPopUp'
import { Link as RouterLink } from 'react-router-dom'
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
    ClickAwayListener,
    Grid,
} from '@material-ui/core';
import allCor from '../../../images/all.png'

const useStyles = theme => ({
    button: {
        // margin: theme.spacing(1)
    }
});
class AllCoreographiesSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCorPopUpCheck: false
        };
    }
    handleOpen = () => {
        // console.log('girdi')
        this.setState({ allCorPopUpCheck: true })
        this.props.setPopUpAll(true)
    };
    handleChangeMenu = (event) => {
        this.setState({
            selectedMenuIds: event.target.value.menuId,
            selectedMenuName: event.target.value,
            selectedMenu: event.target,
        });
    };
    addUser(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container spacing={4}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <Button
                        // className={props.classes.cardAction}
                        onClick={this.handleOpen}
                    >
                        <img src={allCor} />
                    </Button>
                    <AllCoreographiesPopUp />
                </Grid>
            </Grid>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         popUpAll: state.popUpAll,
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        setPopUpAll: popUpAll =>
            dispatch({ type: actionTypes.POPUP_ALL, popUpAll }),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(useStyles)(AllCoreographiesSelect));