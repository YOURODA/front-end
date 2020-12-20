import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import APIService from '../Services/APIServices'
const odaName = "test2"
function CreateUserPopUp(props) {
    const [open, setOpen] = React.useState(false);
    const [corName, setCorName] = React.useState();
    const [odaNick, setOdaNick] = React.useState();
    const [giveNameOfCh, setGiveNameOfCh] = React.useState();
    const apiServices = new APIService()

    // const handleClickOpen = () => {
    //     setOpen(true);
    //     props.setCreateCorPopup(open)
    // };

    const handleClose = () => {
        setOpen(false);
        props.setCreateCorPopup(open)
    };
    const getCoreographyName = (e) => {
        console.log(e.target.value)
        setCorName(e.target.value)
    };

    const createSaveCor = () => {
        console.log(corName, props.currently_playing, props.corData, props.currentTrackId, props.userId)
        apiServices.createCoreography(corName, props.currently_playing, props.corData, props.currentTrackId, props.userId).then(response => {
            console.log(response.data)
            if (response.status === 200) {
                setOpen(false)
                props.setCreateCorPopup(open)
            }
        })
    }
    const giveNameOfCoroegraphy = (e) => {
        setGiveNameOfCh(e.target.value)
    }

    return (
        <div>
            <DialogTitle id="form-dialog-title">CREATE COREOGRAPHY</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please give a name for your coreography.
                </DialogContentText>
                <TextField onChange={e => getCoreographyName(e)}
                    id="standard-search"
                    label="Coroegraphy Name"
                    type="search" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={createSaveCor} color="primary">
                    Save
                    </Button>
            </DialogActions>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        createUserPopup: state.createUserPopup,
        user: state.current_user,
        currentTrackId: state.currentTrackId,
        currently_playing: state.currently_playing,
        corData: state.corData,
        userId: state.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCreateCorPopup: createCorPopup => dispatch({ type: actionTypes.CREATE_COR_POPUP, createCorPopup })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPopUp);
