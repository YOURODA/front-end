import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

import APIService from "../../Components/Services/APIServices";
import FirstCategory from "../../Components/LiveParty/FirstCategory/FirstCategory";
import CategoriesList from "../../Components/LiveParty/CategoriesList/CategoriesList";
import SecondsListSender from "../../Components/LiveParty/SecondsListSender/SecondsListSender";
import AppBarSettings from "../../Components/CoreographyNew/miniCorGroup/AppBarSettings";
import SocketLogin from "../../Components/Socket/SocketLogin";

/*
 *Live parti için ana sayfa
 */

const apiService = new APIService();

const LiveParty = ({ livePartyCategories, setCategories }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {;
    setLoading(true);
    apiService
      .getLivePartAllCategory()
      .then((response) => {
        if (response.status === 200) {
          if (response.data && Object.keys(response.data).length === 0) {
            setCategories([]);
          } else {
            setCategories([...response.data]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => {};
  }, []);

  if (loading) {
    return <>Loading</>;
  }
  if (livePartyCategories.length === 0) {
    return <FirstCategory />;
  }

  return (
    <div style={{ backgroundColor: "#001e3c", height: "100vh" }}>
      <SocketLogin/>
      <SecondsListSender/>
      <AppBarSettings
        isShowLiveTry
        isShowSmokeStatus
        isShowSmokeButton
        isShowStopButton
      />
      <CategoriesList />;
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    livePartyCategories: state.livePartyCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (livePartyCategories) =>
      dispatch({
        type: actionTypes.LIVE_PARTY_CATEGORIES,
        livePartyCategories,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveParty);
