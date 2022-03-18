import React, { useState } from "react";
import { Box, Rating, Typography, Button } from "@mui/material";
import SendRatingDialog from "./SendRatingDialog";
import ReadRatingDialog from "./ReadRatingDialog";
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';

const RatingCor = ({  rowData }) => {
  // console.log(first)
  const [value, setValue] = React.useState(rowData?.ratings?.average ? rowData?.ratings?.average :0 );
  const [openSendDialog, setOpenSendDialog] = React.useState(false);
  const [openReadDialog, setOpenReadDialog] = React.useState(false);
  
  return (
    <>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(()=>newValue);
          setOpenSendDialog(!openSendDialog)
        }}
      />
      <Button variant="outlined" onClick={()=>setOpenReadDialog(!openReadDialog)}> Reviews</Button>
      {openSendDialog &&(
        <SendRatingDialog open={openSendDialog} setOpen={setOpenSendDialog} corId={rowData._id} value={value} />
      )}
      {openReadDialog &&(
          <ReadRatingDialog open={openReadDialog} setOpen={setOpenReadDialog} corId={rowData._id} />
      )}

    </>
  );
};

export default RatingCor;
