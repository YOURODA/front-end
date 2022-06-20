import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

import APIService from "../../Components/Services/APIServices";
import FirstCategory from "../../Components/LiveParty/FirstCategory/FirstCategory";
import CategoriesList from "../../Components/LiveParty/CategoriesList/CategoriesList";

/*
 *Live parti için ana sayfa
 */

const apiService = new APIService();

const LiveParty = ({livePartyCategories,setCategories}) => {
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log("use effect");
    setLoading(true)
    apiService
      .getLivePartAllCategory()
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          console.log("response", response);
          if(response.data && Object.keys(response.data).length === 0){
            setCategories([])
            
          }else {
            // setCategories([]);
            setCategories([response.data]);
          }
          setLoading(false)
          
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => {};
  }, []);

  if(loading){
    return <>Loading</>
  }
  console.log("livePartAllCategory",livePartyCategories)
  if (livePartyCategories.length === 0) {
    return (
      <FirstCategory/ >    );
  }

  return <CategoriesList/>;
};

const mapStateToProps = (state) => {
  return {
    livePartyCategories: state.livePartyCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (livePartyCategories) => dispatch({
      type: actionTypes.LIVE_PARTY_CATEGORIES,
      livePartyCategories
    }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveParty);
