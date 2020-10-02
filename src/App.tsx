import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Channels } from "./Channels/Channels";
import { Groups } from "./Groups/Groups";
import "./App.css";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Channels />
        </Route>
        <Route path="/groups">
          <Groups />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
