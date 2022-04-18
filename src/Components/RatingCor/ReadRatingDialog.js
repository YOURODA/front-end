import React, { useState, useEffect } from "react";
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
  Grid,
  Skeleton ,
  Divider
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import APIService from "../Services/APIServices";
import "./style.css";



const ReadRatingDialog = ({ open, setOpen, corId }) => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const apiServices = new APIService();

  useEffect(() => {
    setLoading(true)
    apiServices
      .readCorReviews({ corId })
      .then((response) => {
        if (response.status === 200) {
          console.log("sentReviews response ", response.data.cor);
          setLoading(false)
          setReview(response.data.cor);
        }
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
        console.log("sentReviews Err", err);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const showListReview = (reviews) => {
    return reviews.map((review) => {
      return (
        <div className="ReadReview-main">
          <div className="ReadReview-header">
            <div className="ReadReview-header-author">
              {review.ownerId.name}
            </div>
            <div>
              <Rating name="read-only" value={review.rating} readOnly />
            </div>
          </div>

          <div className="ReadReview-comment">
              {review.review}
          </div>
          <Divider />
        </div>
      );
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
        <DialogTitle>Reviews</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              justifyContent: "space-between",
            }}
          >
            {loading && <Skeleton animation="wave" />}
            {error && <div>
              No have reviews
              </div>}

            {review.length > 0 && showListReview(review)}

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReadRatingDialog;
