import React from 'react';
import { Route, Switch } from 'react-router';
import Issues from '../components/landing/Issues/Issues';
import NewIssue from '../components/landing/NewIssue/NewIssue';
import Users from '../components/landing/Users/Users';

const MainPage = (props) => {
  return (
    <div className="main-page">
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route exact path="/issues">
          <Issues />
        </Route>
        <Route exact path="/issues/new">
          <NewIssue />
        </Route>
      </Switch>
    </div>
  );
};
export default MainPage;
