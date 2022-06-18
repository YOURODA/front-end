import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import NewCategoryDialog from "../NewCategoryDialog/NewCategoryDialog";

import { Carousel } from '@trendyol-js/react-carousel';

export const CategoriesList = (livePartyCategories) => {


  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <div>
      {livePartyCategories.map(category=>{

      })}



      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <NewCategoryDialog setCreateCorPopup={(e) => setDialogOpen(e)} />
      </Dialog>
    
    </div>
  );
};

const mapStateToProps = (state) => ({
  livePartyCategories: state.livePartyCategories,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FirstCategory);
