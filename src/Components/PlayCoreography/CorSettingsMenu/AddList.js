import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ButtonGroup,
  Paper,
  List
} from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
import APIService from "../../Services/APIServices";
import { withStyles } from "@material-ui/core/styles";
import {
  Button
} from "@material-ui/core"
import * as actionTypes from "../../../store/actions/actionTypes";

const apiService = new APIService();

const ChooseList = withStyles({
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
const AddList = ({ open, setOpen, corId, list, setList }) => {
  const [listName, setListName] = useState("");
  const apiServices = new APIService();
  const [windowSize, setWindowSize] = useState({
    width: 1000,
    height: 1000,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    apiService
      .getUserCorListAll()
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
        }
      })
      .catch((err) => {
      });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [list]);
  const addToTheList = ({ corListId }) => {
    apiServices
      .addNewSongToList({ newSong: corId, corListId })
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


  // const showListingCorList = () => {
  //   return list.map((corList) => {
  //     return (
  //       // <Box sx={{
  //       //   display: 'flex',
  //       //   flexDirection: 'column',
  //       //   alignItems: 'center',
  //       //   '& > *': {
  //       //     m: 1,
  //       //   },
  //       // }}>
  //       <ButtonGroup aria-label="text button group">
  //         <ChooseList onClick={() => addToTheList({ corListId: corList._id })}>{corList.name}</ChooseList>
  //       </ButtonGroup>
  //       // </Box>
  //     )

  //   })



  // }


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
          <Paper style={{ maxHeight: windowSize.height - 340, overflow: "auto", backgroundColor: "#001e3c" }}>
            <List>
              {
                list.map((corList) => {
                  return (
                    <ChooseList onClick={() => addToTheList({ corListId: corList._id })}>{corList.name}</ChooseList>
                  );
                })}
            </List>
          </Paper>
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
    list: state.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setList: (list) =>
      dispatch({ type: actionTypes.SET_LIST, list }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddList);
