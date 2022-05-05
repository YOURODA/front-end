import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
// import * as actionTypes from "../../../store/actions/actionTypes";

const drawerWidth = 200;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// isApi:true,isYourList:false,selected:"All"

const CorListDrawer = ({ list ,setCorScreen}) => {
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <DrawerHeader></DrawerHeader>
      <Divider />
      <List>
        {["All", "My", "Hit"].map((text, index) => (
          <ListItem button key={text} onClick={() => setCorScreen({isYourList:false,selected:text})}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {list.length > 0 ? (
          list.map((corList, index) => (
            <ListItem button key={corList._id} onClick={()=> setCorScreen({isYourList:true,selected:corList.name})}>
              <ListItemText primary={corList.name} />
            </ListItem>
          ))
        ) : (
          <>Loading</>
        )}
      </List>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCorScreen: (playChoreographyScreen) =>
      dispatch({
        type: actionTypes.PLAY_CHOREOGRAPH_SCREEN,
        playChoreographyScreen,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CorListDrawer);

// export default Drawer
