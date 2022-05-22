import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "../PlayChoreographiesTable/useStyles";
import * as actionTypes from "../../../store/actions/actionTypes";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Button } from "@material-ui/core"
import SendIcon from "@mui/icons-material/Send";
import APIService from "../../Services/APIServices";

const PopupCreateButton = withStyles({
  root: {
    backgroundColor: "#001e3c",
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#66B2FF",
      color: "white"
    },
  }
})((props) => <Button  {...props} />);
const PopupCloseButton = withStyles({
  root: {
    // backgroundColor: "#DE675F",
    color: "#DE675F",
    "&:hover": {
      backgroundColor: "#FFFFF",
      color: "#DE675F"
    },
  }
})((props) => <Button  {...props} />);


const NewList = ({ open, setOpen, corId, list, setList }) => {
  const [listName, setListName] = useState("");
  const apiServices = new APIService();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  useEffect(() => {
    apiServices
      .getUserCorListAll()
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
        }
      })
      .catch((err) => {
      });
  }, [list]);
  const newCorList = () => {
    apiServices
      .createNewList({ name: listName, corId })
      .then((response) => {
        if (response.status === 200) {
          const listNew = [...list];
          listNew.push(response.data);
          setList(listNew);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log("sentReviews Err", err);
      });
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New List</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              maxWidth: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="standard-basic"
              label="List Name"
              value={listName}
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                maxWidth: "100%",
                paddingTop: "15px",
              }}
            >
              <PopupCreateButton
                onClick={() => newCorList()}
              >
                Create
              </PopupCreateButton>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <PopupCloseButton onClick={handleClose}>Close</PopupCloseButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setList: (list) =>
      dispatch({ type: actionTypes.SET_LIST, list }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NewList));
