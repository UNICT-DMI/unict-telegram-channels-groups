import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Menu} from './Menu/Menu';
import {Channels} from './Channels/Channels';
import {Groups} from './Groups/Groups';
import {Bots} from './Bots/Bots';
import './App.scss';

export default function App(): JSX.Element {
   return (
      <div className="App">
         <HashRouter basename="/">
            <Switch>
               <Route exact path="/channels">
                  <Menu section="channels"/>
                  <Channels/>
               </Route>
               <Route exact path="/groups">
                  <Menu section="groups"/>
                  <Groups/>
               </Route>
               <Route exact path="/bots">
                  <Menu section="bots"/>
                  <Bots/>
               </Route>
               <Redirect to="/channels"/>
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
