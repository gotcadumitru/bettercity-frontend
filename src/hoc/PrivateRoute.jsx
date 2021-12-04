import React, { useEffect } from 'react';
import { authToken } from '../common/helpers/token';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from '../common/state/reducer/user.reducer';
import { fetchAuthUserThunk } from '../common/state/thunk/user.thunk';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const userFetchStatus = useSelector((state) => state.profileInfo.user.fetchStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthUserThunk());
    // eslint-disable-next-line
  }, []);
  if (!authToken.getToken() || userFetchStatus === FetchStatus.FAIL) {
    authToken.removeToken();
  }

  if (userFetchStatus !== FetchStatus.SUCCESS && authToken.getToken()) {
    return <div className="empty-page" />;
  }
  return (
    <React.Fragment>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </React.Fragment>
  );
};
