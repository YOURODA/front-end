import React from 'react'
import { connect } from 'react-redux'
// import "./miniCorGroup"
import * as actionTypes from "../../../store/actions/actionTypes";
import styles from "./miniCorGroup.module.css" 

export const MiniCorGroup = (props) => {
  
  const {corLoop}= props
  
  if(corLoop.length === 0 ){
    return(
    <div className={styles.CorGroup}>     
        cor loop buraya gelecek 
    </div>
    )
  }

  return (
    <div className={styles.CorGroup}>
        Henüz hiç corloop yok 
    </div>
  )
}

const mapStateToProps = (state) => ({
  corLoop: state.corLoop
})

const mapDispatchToProps = (dispatch) => {
  return {
    setCorLoop: (corLoop) =>
      dispatch({ type: actionTypes.COR_LOOP, corLoop }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCorGroup)
