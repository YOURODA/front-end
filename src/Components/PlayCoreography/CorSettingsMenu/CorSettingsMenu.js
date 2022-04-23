import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewList from "./NewList";
import AddList from "./AddList";

const CorSettingsMenu = ({rowData})=> {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNewList, setOpenNewList] = useState(false);
  const [openAddList, setOpenAddList] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNewList =()=>{
    setOpenNewList(true);
    setAnchorEl(null);
  }
  const handleAllList=()=>{
    setOpenAddList(true);
    setAnchorEl(null);
  }


  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleNewList}>New List</MenuItem>
        <MenuItem onClick={handleAllList}>Add List</MenuItem>

      </Menu>
      {openNewList && (
        <NewList
          open={openNewList}
          setOpen={setOpenNewList}
          corId={rowData._id}
          // value={value}
        />
      )}
      {openAddList && (
        <AddList
        open={openAddList}
        setOpen={setOpenAddList}
        corId={rowData._id}
        />
      )}

    </div>
  );
}

export default CorSettingsMenu;
