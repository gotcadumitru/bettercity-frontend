import React from 'react';
import { Route, Switch } from 'react-router';
import Issues from '../components/landing/Issues/Issues';
import Users from '../components/landing/Users/Users';

const MainPage = (props) => {
  return (
    <div className="main-page">
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/issues">
          <Issues />
        </Route>
      </Switch>
    </div>
  );
};
export default MainPage;
