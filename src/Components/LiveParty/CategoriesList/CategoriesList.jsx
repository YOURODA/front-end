import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dialog, Box, IconButton } from "@mui/material";

import NewCategoryDialog from "../NewCategoryDialog/NewCategoryDialog";
import { Link } from "react-router-dom";
import CorBox from "./CorBox";

import { Carousel } from "@trendyol-js/react-carousel";
import styles from "./styles.module.css";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";

export const CategoriesList = ({ livePartyCategories }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className={styles.livePartyContainer}>
      {Array.isArray(livePartyCategories) &&
        livePartyCategories.map((category) => {
          console.log("category", category);
          return (
            <>
              <div className={styles.categoryTitle}>
                <div className={styles.categoryName}>{category.name}</div>
                <div>
                  <Link to={`/live-party/make-cor/${category._id}`}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddIcon />
                    </IconButton>
                  </Link>
                </div>
              </div>

              <Carousel
                // show={10}
                slide={5}
                swiping={true}
                // dynamic={true}
                show={10}
                // transition={0.5}
              >
                {category &&
                  category.cors &&
                  Array.isArray(category.cors) &&
                  category?.cors?.map((cor, index) => {
                    console.log("cor before corbox", cor);
                    return <CorBox cor={cor} />;
                  })}
              </Carousel>
            </>
          );
        })}

      <IconButton color="primary" aria-label="Add category" component="span"  onClick={() => setDialogOpen(true)}>
        <AddIcon />
      </IconButton>
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
