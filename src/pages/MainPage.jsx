import React from 'react';
import { Route, Switch } from 'react-router';
import Issues from '../components/landing/Issues/Issues';
import NewIssue from '../components/landing/NewIssue/NewIssue';
import Users from '../components/landing/Users/Users';
import SvgMap from '../components/landing/maps/SvgMap';
import IssuePage from '../components/landing/IssuePage/IssuePage';
import Statistics from '../components/landing/Statistics/Statistics';
const MainPage = (props) => {
  return (
    <div className="main-page">
      <Switch>
        <Route path="/contributors">
          <Users />
        </Route>
        <Route exact path="/issues">
          <Issues />
        </Route>
        <Route exact path="/issues/new">
          <NewIssue />
        </Route>
        <Route path="/issues/:id">
          <IssuePage />
        </Route>
        <Route exact path="/map">
          <SvgMap />
        </Route>
        <Route exact path="/dashboard">
          <Statistics />
        </Route>
      </Switch>
    </div>
  );
};
export default MainPage;
