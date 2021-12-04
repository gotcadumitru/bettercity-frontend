import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { logOutThunk } from '../../state/thunk/user.thunk';
const Toolbar = (props) => {
  const user = useSelector((state) => state.profileInfo.user.data);
  const dispatch = useDispatch();
  return (
    <div className="toolbar">
      {user ? (
        <>
          <div className="toolbar__item">
            <AiOutlineUser className="toolbar__item-logo" /> {user.name}
          </div>
          <Link
            onClick={() => {
              dispatch(logOutThunk());
            }}
            className="toolbar__item"
            to="/issues"
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link className="toolbar__item" to="/auth/login">
            Login
          </Link>
          <Link className="toolbar__item" to="/auth/register">
            Register
          </Link>
        </>
      )}
      <div></div>
    </div>
  );
};

export default Toolbar;
