import React, { useState } from "react";
import {
  Box,
  Rating,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import APIService from "../../Services/APIServices";

const NewList = ({open,setOpen,corId}) => {
  const [listName, setListName] = useState("");
  const apiServices = new APIService();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  const newCorList = () => {
    console.log("send Re", { name:listName, corId });
    apiServices
      .createNewList({ name:listName, corId })
      .then((response) => {
        if (response.status === 200) {
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
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              maxWidth: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="outlined-multiline-flexible"
              label="List Name"
              multiline
              maxRows={4}
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
              <Button
                onClick={() => newCorList()}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Create
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewList;
