import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import { withStyles } from '@material-ui/styles';
import Editor from '../../Editor/Editor'
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
    Grid,
} from '@material-ui/core';
import myCor from '../../../images/myCor.png'

const useStyles = theme => ({
    button: {
        // margin: theme.spacing(1)
    }
});
class MyCoreographiesSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOpen = () => {
        this.props.setAllCorPopUp(true)
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
                <Grid item lg={6} md={6} xl={6} xs={6}>
                    {/* <Card
                        className={classes.root}
                    >
                        <ButtonBase
                            className={classes.cardAction}
                            onClick={this.handleOpen}
                        >
                            <CardActionArea>
                                <CardMedia
                                    image={allCor}
                                    title="Click Me For O'da"
                                />
                            </CardActionArea>
                        </ButtonBase>
                    </Card> */}
                    <img src={myCor} />
                </Grid>
            </Grid>
        );
    }
}



const mapStateToProps = state => {
    // return {

    // };
};
const mapDispatchToProps = dispatch => {
    // return {
    //     setAllCorPopUp: allCorPopUp =>
    //         dispatch({ type: actionTypes.ALL_COR_POPUP, allCorPopUp }),
    //     setOnCloseCsvData: onCloseCsvData =>
    //         dispatch({ type: actionTypes.ON_CLOSE_CSV_DATA, onCloseCsvData }),
    // };
};

export default connect(
    null,
    null
)(withStyles(useStyles)(MyCoreographiesSelect));