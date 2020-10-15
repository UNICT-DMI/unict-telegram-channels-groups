import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Channels } from './Channels/Channels';
import { Groups } from './Groups/Groups';
import './App.css';

export const API = 'https://seminaraluigi.altervista.org/list-telegram-groups';

function App(): JSX.Element {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/channels">
            <Channels />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Redirect to="/channels" />
        </Switch>
      </HashRouter>
      <p className="credits">
        Coded by
        <a href="https://github.com/Lorenzo-Pappalardo">Lorenzo Pappalardo</a>
        <a href="https://github.com/Helias">Stefano Borzì</a>
        <a href="https://github.com/Gigi-G">Luigi Seminara</a>
      </p>
    </div>
  );
}

export default App;
