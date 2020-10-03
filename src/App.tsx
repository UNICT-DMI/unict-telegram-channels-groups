import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Channels } from "./Channels/Channels";
import { Groups } from "./Groups/Groups";
import "./App.css";

function App(): JSX.Element {
  return (
    <div>
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
      <p className="credits">
        Coded by{" "}
        <a href="https://github.com/Lorenzo-Pappalardo">Lorenzo Pappalardo</a>
      </p>
    </div>
  );
}

export default App;
