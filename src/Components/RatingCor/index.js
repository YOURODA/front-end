import React, { useState } from "react";
import { Box, Rating, Typography, IconButton } from "@mui/material";
import { Button } from "@material-ui/core"
import SendRatingDialog from "./SendRatingDialog";
import ReadRatingDialog from "./ReadRatingDialog";
import { withStyles } from "@material-ui/core/styles";

// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
const ReviewButton = withStyles({
  root: {
    backgroundColor: "#DE675F",
    color: "white",
    "&:hover": {
      backgroundColor: "#66B2FF",
      color: "white"
    },
  }
})((props) => <Button color="default" {...props} />);
const RatingCor = ({ rowData }) => {
  // console.log(first)
  const [value, setValue] = React.useState(
    rowData ?.ratings ?.average ? rowData ?.ratings ?.average : 0
  );
  const [openSendDialog, setOpenSendDialog] = React.useState(false);
  const [openReadDialog, setOpenReadDialog] = React.useState(false);

  return (
    <>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(() => newValue);
          setOpenSendDialog(!openSendDialog);
        }}
      />

      <ReviewButton
        onClick={() => setOpenReadDialog(!openReadDialog)}
      >
        Reviews
      </ReviewButton>

      {openSendDialog && (
        <SendRatingDialog
          open={openSendDialog}
          setOpen={setOpenSendDialog}
          corId={rowData._id}
          value={value}
        />
      )}
      {openReadDialog && (
        <ReadRatingDialog
          open={openReadDialog}
          setOpen={setOpenReadDialog}
          corId={rowData._id}
        />
      )}
    </>
  );
};

export default RatingCor;
