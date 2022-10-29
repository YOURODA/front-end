import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dialog, Box, IconButton } from "@mui/material";

import NewCategoryDialog from "../NewCategoryDialog/NewCategoryDialog";
import { Link } from "react-router-dom";
import CorBox from "./CorBox";

import { Carousel } from "@trendyol-js/react-carousel";
import styles from "./styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import useWindowSize from "../../../hooks/useWindowDimensions";

export const CategoriesList = ({ livePartyCategories }) => {
  const size = useWindowSize();
  const showingCors = size.width / 130;

  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className={styles.livePartyContainer}>
      {Array.isArray(livePartyCategories) &&
        livePartyCategories.map((category) => {
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
                swiping={true}
                show={~~showingCors}
                slide={3}
                rightArrow={false}
                leftArrow={false}
                useArrowKeys={"true"}
                responsive={"true"}
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

      <IconButton
        color="primary"
        aria-label="Add category"
        component="span"
        onClick={() => setDialogOpen(true)}
      >
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
