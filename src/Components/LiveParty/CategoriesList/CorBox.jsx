import React from "react";
import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";

const CorBox = ({ cor, secondsQueue, setSecondsQueue }) => {
  const showSecondsQueue = () => {
    setSecondsQueue({ liveCor: cor.file, seconds: 0 });
  };

  return (
    <Box
      onClick={() => showSecondsQueue()}
      className={[styles.unselectable, styles.neonBox]}
      sx={{
        width: 100,
        height: 100,
        backgroundColor: cor.color,
        "&:hover": {
          backgroundColor: cor.color,
          opacity: [0.9],
          boxShadow: "inset 5px 5px 10px rgba(0,0,0,0.5)",
        },
        p: 2,
        border: "1px dashed grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 1,
        boxShadow: `
        10px 20px 50px rgba(0,0,0,.8)
        `,
      }}
    >
      <div className={styles.corBox}>
        <div className={styles.categoryName}>{cor.name}</div>

        <div>{cor.file.length}</div>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  secondsQueue: state.secondsQueue,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSecondsQueue: (secondsQueue) =>
      dispatch({ type: actionTypes.SET_SECOUNDS_QUEUE, secondsQueue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CorBox);
