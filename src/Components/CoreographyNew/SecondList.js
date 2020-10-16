import React, { Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import {
    List, ListItem, ListItemText, ListItemIcon, Checkbox, Button,
    Divider, Grid,
    CardActions
} from '@material-ui/core';

const colorPWM = 65534 / 256;
class SecondList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [1],
            checkedMultiple: [],
        };
    }

    milisToMinutesAndSeconds = mil => {
        let minutes = Math.floor(mil / 60000);
        let seconds = ((mil % 60000) / 1000).toFixed(0);
        let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
        return secondsOfSum;
    };
    handleToggleMultiple = (value) => {
        const currentIndex = this.state.checkedMultiple.indexOf(value);
        const newChecked = [...this.state.checkedMultiple];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({ checkedMultiple: newChecked });
    };
    render() {
        const { checkedMultiple, takenSecondList } = this.state
        let clearSeconds = this.milisToMinutesAndSeconds(this.props.durationStamps)
        let getSeconds = new Array(clearSeconds).join('0').split('').map(parseFloat)
        this.clearSecondList = getSeconds.map((index, value) => value)
        return (
            <div>
                <Grid container spacing={3}>
                    {this.clearSecondList &&
                        <List>
                            {this.clearSecondList.map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <React.Fragment>
                                        <ListItem key={value} role={undefined} dense button onClick={() => this.handleToggleMultiple(value)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checkedMultiple.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`${value}.second`} />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    }
                </Grid>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {
        durationStamps: state.durationStamps,
        socket: state.socket,
        leftHorValue: state.leftHorValue,
        leftVerValue: state.leftVerValue,
        rightHorValue: state.rightHorValue,
        rightVerValue: state.rightVerValue,
        brightnessValue: state.brightnessValue,
        blinkerValue: state.blinkerValue

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SecondList);
