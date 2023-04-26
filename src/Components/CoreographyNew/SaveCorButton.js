import React, { useState } from "react";
import {
  Button,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Checkbox,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import APIService from "../Services/APIServices";
import useLocalStorage from "../../hooks/useLocalStorage";
import { withStyles } from "@material-ui/core/styles";

const SaveButton = withStyles({
  root: {
    backgroundColor: "#DE675F",
    color: "white",
    "&:hover": {
      backgroundColor: "#66B2FF",
      color: "white"
    },
  }
})((props) => <Button color="default" {...props} />);
const SaveCorButton = ({
  songCor,
  currently_playing,
  userId,
  currentTrackId,
  corSaveInfo,
}) => {
  const [open, setOpen] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [getLocalDbEditCor, setLocalDbEditCor] = useLocalStorage(
    "editCorId",
    ""
  );

  const [corName, setCorName] = useState("");
  const apiServices = new APIService();

  const handleClose = () => {
    console.log("handleClose ile kapatildi")
    setOpen(false);
  };
  const createSaveCor = () => {
    const file = { ...songCor };
    // console.log("file", file);
    // console.log({
    //   name: corName,
    //   trackName: currently_playing,
    //   file,
    //   trackId: currentTrackId,
    //   ownerId: userId,
    //   isShared,
    // });
    apiServices
      .createCoreography(
        corName,
        currently_playing,
        songCor,
        currentTrackId,
        userId,
        isShared
      )
      .then((response) => {
        if (response.status === 200) {
          setLocalDbEditCor(response.data.cor._id)
          // TODO Kayıt edildiğine dair uyarı
          setOpen(false);
        }
      });
  };

  const overwriteCor = () => {
    apiServices.overwriteCor({ file: songCor, name: corSaveInfo.name, corId: corSaveInfo._id }).then((response) => {
      if (response.status === 200) {
        setOpen(false);
      }
    }).catch((err) => {
      console.log("overWriteErr", err)
    })
  }

  const saveDisabled = typeof corName === "string" && corName.length < 5;
  const UpdateCor = () => {
    return (
      <>
        <DialogContentText>
          Do you want to update the previously written Cor?
        </DialogContentText>
        <Button onClick={overwriteCor} color="primary">
          update
        </Button>
      </>
    )
  }
  console.log("open", open)
  return (
    <div>
      <SaveButton onClick={() => setOpen(true)}>Save Chr</SaveButton>
      {open && (
        <div>
          <Dialog
            open={open}
            // onClose={() => handleClose(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              CREATE CHOREOGRAPHY
            </DialogTitle>
            <DialogContent>
              {corSaveInfo && corSaveInfo._id && <UpdateCor />}

              <DialogContentText>
                Please give a name for your choreography.
              </DialogContentText>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setCorName(e.target.value)}
                    id="standard-search"
                    label="Choroegraphy Name"
                    type="search"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    onChange={(event) => setIsShared(event.target.checked)}
                    checked={isShared}
                    color="success"
                  />
                  Share
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={createSaveCor}
                color="primary"
                disabled={saveDisabled}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  songCor: state.songCor,
  currently_playing: state.currently_playing,
  user: state.current_user,
  userId: state.userId,
  currentTrackId: state.currentTrackId,
  corSaveInfo: state.corSaveInfo,
});

export default connect(mapStateToProps, null)(SaveCorButton);
