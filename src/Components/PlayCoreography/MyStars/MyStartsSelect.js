import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import {
    Grid,
} from '@material-ui/core';
import myStars from '../../../images/myStars.png'

const useStyles = theme => ({
    button: {
        // margin: theme.spacing(1)
    }
});
class MyStarsSelect extends Component {
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
        return (
            <Grid container spacing={4}>
                <Grid item lg={6} md={6} xl={6} xs={6}>
                    <img src={myStars} />
                </Grid>
            </Grid>
        );
    }
}



export default connect(
    null,
    null
)(withStyles(useStyles)(MyStarsSelect));