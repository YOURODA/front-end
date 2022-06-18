import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import APIService from '../../Services/APIServices'

function CreateUserPopUp(props) {
    const [open, setOpen] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState();
    const apiServices = new APIService()


    const handleClose = () => {
        setOpen(false);
        props.setCreateCorPopup(false)
    };

    const createSaveCor = () => {
        apiServices.livePartCreateCategory({name:categoryName}).then(response => {
            if (response.status === 200) {
              handleClose()
            }
        })
    }

    return (
        <div>
            <DialogTitle id="form-dialog-title">Create Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please give a name for your Category.
                </DialogContentText>
                <TextField onChange={e => setCategoryName(e.target.value)}
                    id="standard-search"
                    label="Category Name"
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

    };
};

const mapDispatchToProps = dispatch => {
    
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPopUp);
