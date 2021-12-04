import React from 'react';
import { useNavigate } from 'react-router';
import { authToken } from '../common/helpers/token';

const ProfilePage = (props) => {
  const history = useNavigate();

  return (
    <div className="profile">
      <div>Profile page</div>
      <button
        className="button"
        onClick={() => {
          authToken.removeToken();
          history.push('/auth/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
