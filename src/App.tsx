import React, { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Channels } from "./Channels/Channels";
import { Groups } from "./Groups/Groups";
import "./App.css";

function RoutingOptions(): JSX.Element {
  const [page, setPage] = useState<string>("");

  return (
    <div className="routing">
      <div>
        <Link to="/" onClick={() => setPage("channels")}>
          Channels
        </Link>
      </div>
      <div>
        <Link to="/groups" onClick={() => setPage("groups")}>
          Groups
        </Link>
      </div>
      {page == "channels" ? (
        <h1 className="rankingTitle">Classifica canali UNICT</h1>
      ) : (
        <h1 className="rankingTitle">Classifica gruppi UNICT</h1>
      )}
    </div>
  );
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <RoutingOptions />
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
