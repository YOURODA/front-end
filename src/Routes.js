import React from "react";
import { Redirect, Switch } from "react-router-dom";
import RouteWithLayout from "./Components/RouteWithLayout/RouteWithLayout";
import Editor from "./Components/Editor/Editor";
import PartySelection from "./Components/PartySelection/PartySelection";
import PlayCoreography from "./Components/PlayCoreography/PlayCoreography";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/party-selection" />
      <RouteWithLayout exact layout={PartySelection} path="/party-selection" />
      <RouteWithLayout
        exact
        layout={PlayCoreography}
        path="/play-coreography"
      />
      <RouteWithLayout exact layout={Editor} path="/make-coreography" />
    </Switch>
  );
};

export default Routes;
