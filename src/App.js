import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthPrivateRoute } from './hoc/AuthPrivateRoute';
import './style/main.scss';
import Notification from './common/components/common/Notification';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import Sidebar from './common/components/layout/Sidebar';
import Toolbar from './common/components/layout/Toolbar';
import React from 'react';
import { PrivateRoute } from './hoc/PrivateRoute';
function App(props) {
  return (
    <div className="landing">
      <BrowserRouter>
        <Switch>
          <AuthPrivateRoute path="/auth" component={AuthPage} />
          <PrivateRoute path="/">
            <Sidebar />
            <div className="landing__container">
              <Toolbar />
              <MainPage />
            </div>
          </PrivateRoute>
        </Switch>
        <Notification />
      </BrowserRouter>
    </div>
  );
}

export default App;
