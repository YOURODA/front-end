import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import APIService from "../Services/APIServices";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { CirclePicker } from "react-color";


const SaveButton = withStyles({
  root: {
    backgroundColor: "#DE675F",
    color: "white",
    "&:hover": {
      backgroundColor: "#66B2FF",
      color: "white",
    },
  },
})((props) => <Button color="default" {...props} />);
const SaveLivePartyButton = ({
  songCor,
  setCategories,
  setSongCor
}) => {
  let { categoryId } = useParams();
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FF0000");
  const apiServices = new APIService();


  const handleClose = () => {
    setOpen(false);
  };
  const saveLoop = () => {
    apiServices
      .livePartAddFileToCategory({ categoryId, name, color, file: songCor })
      .then((response) => {
        if (response.status === 200) {
          if (response.data && Object.keys(response.data).length === 0) {
            setCategories([])
          } else {
            setCategories([...response.data]);
          }
          setSongCor([])
          history.push("/live-party");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

  };

  const saveDisabled = typeof name === "string" && name.length < 5;

  return (
    <div>
      <SaveButton onClick={() => setOpen(true)}>Save Loop</SaveButton>
      {open && (
        <div>
          <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">CREATE Loop</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please give a name for your loop.
              </DialogContentText>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    id="standard-search"
                    label="Loop Name"
                    type="search"
                  />
                </Grid>
                <Grid item lg={4} md={4} xl={4} xs={4}>
                  <div style={{ float: "center" }}>
                    <CirclePicker
                      color={color}
                      onChangeComplete={col => setColor(col.hex)}
                      colors={[
                        "#FF0000",
                        "#f44336",
                        "#e91e63",
                        "#9c27b0",
                        "#FF00FF",
                        "#673ab7",
                        "#3f51b5",
                        "#2196f3",
                        "#0000FF",
                        "#03a9f4",
                        "#00FFFF",
                        "#009688",
                        "#00FF00",
                        "#4caf50",
                        "#8bc34a",
                        "#cddc39",
                        "#FFFF00",
                        "#ffc107",
                        "#ff9800",
                        "#ff5722",
                        "#795548",
                        "#000000",
                        "#607d8b",
                        "FFFFFF",
                      ]}
                    />
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={saveLoop}
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

});

const mapDispatchToProps = (dispatch) => ({
  setCategories: (livePartyCategories) => dispatch({
    type: actionTypes.LIVE_PARTY_CATEGORIES,
    livePartyCategories
  }),
  setSongCor: (songCor) => dispatch({ type: actionTypes.SONG_COR, songCor })
});


export default connect(mapStateToProps, mapDispatchToProps)(SaveLivePartyButton);
