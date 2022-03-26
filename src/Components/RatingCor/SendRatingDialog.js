import * as React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import Switch from "@mui/material/Switch";
// import TextField from "@mui/material/TextField";
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
import SendIcon from '@mui/icons-material/Send';
import APIService from "../Services/APIServices";

const SendRatingDialog = ({ open, setOpen,corId,value }) => {
  const [review, setReview] = React.useState("");
  const [getRating, setRating] = React.useState(value);
  const apiServices = new APIService();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const sentReviews=()=>{
    console.log("send Re",{review, rating:getRating, corId})
    apiServices.sendReviews({review, rating:getRating, corId}).then((response)=>{
      if (response.status === 200) {
        console.log("sentReviews response ",response);
        setOpen(false);
      }
    }).catch((err)=>{
      console.log("sentReviews Err",err)
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
        <DialogTitle>Reviews</DialogTitle>
        <DialogContent>
          <DialogContentText>See Reviews</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              // m: "auto",
              // width: 'fit-content',
              // width: 500,
              maxWidth: "100%",
              justifyContent:"space-between"
              // backgroundColor: "red",
            }}
          >
                   <Box       
                sx={{
              // display: "flex",
              // flexDirection: "column",
              // marginLeft:"auto",
              maxWidth: "100%",
              paddingBottom:"15px"
            }}>
            <Rating
              name="simple-controlled"
              value={getRating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            </Box>
            <TextField
              id="outlined-multiline-flexible"
              label="Reviews"
              multiline
              maxRows={4}
              value={review}
              onChange={handleChange}
            />
              <Box       
                sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft:"auto",
              maxWidth: "100%",
              paddingTop:"15px"
            }}>
                  <Button onClick={()=>sentReviews()} variant="contained"  endIcon={<SendIcon />}>Send</Button>

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

export default SendRatingDialog;
