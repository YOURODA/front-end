import React from "react";import {
  Button,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog
} from "@material-ui/core";
import { connect } from "react-redux";
import APIService from '../Services/APIServices'
// import Dialog from '@material-ui/core/Dialog';
// import * as actionTypes from "../../store/actions/actionTypes";


const SaveCorButton = ({songCor,currently_playing,userId,currentTrackId}) => {
  const [open, setOpen] = React.useState(false);
  const [corName, setCorName] = React.useState();
  const apiServices = new APIService()

  const handleClose = () => {
    setOpen(false);
};
const createSaveCor = () => {

  const file = {...songCor};
  console.log("file",file)
  console.log({ name:corName, trackName:currently_playing, file, trackId:currentTrackId, ownerId:userId})
  apiServices.createCoreography(corName, currently_playing, songCor, currentTrackId, userId).then(response => {
      if (response.status === 200) {
          console.log("cor save")
          setOpen(false)
      }
  })

}

  return (
    <div>
      <Button onClick={() =>setOpen(true) }>
        Save Cor
        </Button>
        {open && <div>
          <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">CREATE COREOGRAPHYS</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please give a name for your coreography.
                </DialogContentText>
                <TextField onChange={e => setCorName(e.target.value)}
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
            </Dialog>
          </div>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  songCor: state.songCor,
  currently_playing:state.currently_playing,
  user: state.current_user,
  userId: state.userId,
  currentTrackId: state.currentTrackId,
});

export default  connect(mapStateToProps, null)(SaveCorButton);
