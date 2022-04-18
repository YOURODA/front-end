import React, { useState,useEffect } from "react";
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

const AddList = ({ open, setOpen, corId }) => {
  const [listName, setListName] = useState("");
  const [listingCorList, setListingCorList] = useState([]);
  const apiServices = new APIService();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    apiServices
    .getUserCorListAll({})
    .then((response) => {
      if (response.status === 200) {
        console.log("Create New List", response.data);
        setListingCorList(response.data)
      }
    })
    .catch((err) => {
      console.log("sentReviews Err", err);
    });    
  }, [])


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
    console.log("setListingCorList",listingCorList)
    return listingCorList.map((corList)=>{
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

export default AddList;
