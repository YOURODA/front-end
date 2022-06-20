import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import NewCategoryDialog from "../NewCategoryDialog/NewCategoryDialog";

import { Carousel } from '@trendyol-js/react-carousel';

export const CategoriesList = ({livePartyCategories}) => {


  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      {livePartyCategories.map(category=>{
        console.log("category",category.name)
        return(
          <>
          <div>
          {category.name}
          <Button variant="contained" onClick={()=> console.log("add Choreografi")}> Add Choreografi </Button>
          </div>
          
          <Carousel show={3.5} slide={3} swiping={true}>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>
              <> Coreografi adı buraya gelecek</>

          </Carousel>
          </>
        )

      })}


      <Button variant="contained" onClick={()=> setDialogOpen(true)}> + </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
