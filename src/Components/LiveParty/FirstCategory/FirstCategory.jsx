import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import NewCategoryDialog from "../NewCategoryDialog/NewCategoryDialog";

export const FirstCategory = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      Welcome to Live Party Page First step create new category
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        New category
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <NewCategoryDialog setCreateCorPopup={(e)=>setDialogOpen(e) } />
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FirstCategory);
