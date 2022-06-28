import React from "react";
import { Box } from "@mui/material";
import styles from "./styles.module.css";

const CorBox = ({ cor }) => {
  return (
    <Box
      onClick={() => console.log("cor")}
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
        // padding:2,
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

export default CorBox;
