import React, { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Channels } from "./Channels/Channels";
import { Groups } from "./Groups/Groups";
import "./App.css";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Channels />
        </Route>
        <Route exact path="/groups">
          <Groups />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
