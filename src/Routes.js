import React, { useState, useEffect, Component } from 'react'
import { Redirect, Switch, useHistory } from "react-router-dom";
import RouteWithLayout from "./Components/RouteWithLayout/RouteWithLayout";
import Editor from "./Components/Editor/EditorNew";
import PartySelectionNew from "./Components/PartySelection/PartySelectionNew";
import PlayCoreography from "./Components/PlayCoreography/PlayCoreography";
import PlayChoreographies from "./Components/PlayCoreography/PlayChoreographies";
import SignIn from "./Pages/Login/SignIn"
import Register from "./Pages/Register/SignUp"
import LiveParty from "./Pages/LiveParty/LiveParty"
import apiService from "./Components/Services/APIServices";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from 'history';


const browserHistory = createBrowserHistory();
const axiosJWT = axios.create();
export const Routes = (props) => {
  const { setRefreshToken, refreshToken } = props;
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useHistory();

  useEffect(() => {
    refreshTokenUser();
  }, []);

  const refreshTokenUser = async () => {
    try {
      const response = await apiService.refreshToken();
      console.log("refresh", response.status)
      if (response.status == 200) {
        setToken(() => response.data.accessToken);
        setRefreshToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
      } if (response.status === 401) {
        console.log("logine git")
        history.push("/login");
      }
    } catch (error) {
      if (error.response) {
        history.push("/login");
      }
    }
  }
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    console.log("interceptors", token)
    if (expire * 1000 < currentDate.getTime()) {
      const response = await apiService.refreshToken();
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <RouteWithLayout exact layout={SignIn} path="/login" />
      <RouteWithLayout exact layout={Register} path="/register" />
      {localStorage.getItem("refreshToken") &&
        <>
          <RouteWithLayout exact layout={PartySelectionNew} path="/party-selection" />
          <RouteWithLayout
            exact
            layout={PlayChoreographies}
            path="/go-party"
          />
          <RouteWithLayout exact layout={Editor} path="/create-party" />
          <RouteWithLayout exact layout={LiveParty} path="live-Party" />
        </>
      }
    </Switch>
  );
};
export default Routes;

