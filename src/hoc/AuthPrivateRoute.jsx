import React from 'react';
import { authToken } from '../common/helpers/token';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

export const AuthPrivateRoute = ({ component: Component, ...rest }) => {
  const includePath = rest.location.pathname.includes('/auth/confirmRegister/');
  return <Route {...rest} render={(props) => (authToken.getToken() && !includePath ? <Redirect to="/" /> : <Component {...props} />)} />;
};
