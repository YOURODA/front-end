import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
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

const AddList = ({ open, setOpen, corId,list }) => {
  const [listName, setListName] = useState("");
  const apiServices = new APIService();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  
  const addToTheList = ({corListId}) => {
    apiServices
      .addNewSongToList({newSong:corId, corListId})
      .then((response) => {
        if (response.status === 200) {
          console.log("Added", response);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log("sentReviews Err", err);
      });
  };
  

  const handleClose = () => {
    setOpen(false);
  };


  const showListingCorList=({})=>{
    console.log("setListingCorList",list)
    return list.map((corList)=>{
      return (
        <div style={{marginBottom:"15px"}}>

        <Button variant="outlined" onClick={()=>addToTheList({corListId:corList._id})}>{corList.name}</Button>
        </div>
      )

    })
      


  }
  

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select the list you want added</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              maxWidth: "30%",
              justifyContent: "space-between",
              marginLeft:"20px",
              // textAlign:"center"
            }}
          >
            {showListingCorList({})}

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

export default connect(mapStateToProps)(AddList);
// export default AddList;
