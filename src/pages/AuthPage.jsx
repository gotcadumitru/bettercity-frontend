import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { FetchStatus } from '../common/state/reducer/user.reducer';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';

const AuthPage = (props) => {
  const userFetchStatus = useSelector((state) => state.profileInfo.user.fetchStatus);
  const history = useHistory();
  useEffect(() => {
    if (userFetchStatus === FetchStatus.SUCCESS) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [userFetchStatus]);
  return (
    <div className="auth">
      <div className="auth__container">
        <Route exact path="/auth/login">
          <Login />
        </Route>
        <Route exact path="/auth/register">
          <Register />
        </Route>
        <Route exact path="/auth/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/auth/resetpassword/:resetToken">
          <ResetPassword />
        </Route>
      </div>
    </div>
  );
};
export default AuthPage;
