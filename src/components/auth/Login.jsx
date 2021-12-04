import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Input from '../../common/components/common/Input';
import { handleIsNotificationShowAC } from '../../common/state/action/notification.action';
import { resetAuthDataAC } from '../../common/state/action/user.action';
import { FetchStatus } from '../../common/state/reducer/user.reducer';
import { loginThunk } from '../../common/state/thunk/user.thunk';
const initialLoginValues = {
  email: {
    value: '',
    errorMessage: '',
  },
  password: {
    value: '',
    errorMessage: '',
  },
};
const Login = (props) => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.profileInfo);
  const history = useHistory();
  useEffect(() => {
    if (login.fetchStatus === FetchStatus.FAIL) {
      dispatch(handleIsNotificationShowAC(true, true, login.message));
    }
    if (login.fetchStatus === FetchStatus.SUCCESS) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [login]);
  useEffect(() => {
    return () => dispatch(resetAuthDataAC());
    // eslint-disable-next-line
  }, []);
  const [loginData, handleLoginData] = useState({ ...initialLoginValues });

  const handleSubmit = (e) => {
    if (checkIfExistErrors()) return;
    dispatch(
      loginThunk({
        email: loginData.email.value,
        password: loginData.password.value,
      })
    );
  };
  const checkIfExistErrors = () => {
    let isErrors = false;
    let formDataCopy = JSON.parse(JSON.stringify(loginData));

    Object.keys(formDataCopy).forEach((key) => {
      if (!formDataCopy[key].value) {
        isErrors = true;
        formDataCopy[key].errorMessage = 'This field is required';
      }
    });
    if (isErrors) {
      handleLoginData(formDataCopy);
    }
    return isErrors;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    handleLoginData({
      ...loginData,
      [name]: {
        errorMessage: '',
        value,
      },
    });
  };

  return (
    <div className="auth_login">
      <h2 className="auth__title">Login</h2>

      <Input
        onChange={handleChangeInput}
        errorMessage={loginData.email.errorMessage}
        name="email"
        value={loginData.email.value}
        inputLabel="Email Adress"
        className="input"
        placeholder="yadima@gmail.com"
        type="email"
      />
      <Input
        onChange={handleChangeInput}
        errorMessage={loginData.password.errorMessage}
        value={loginData.password.value}
        inputLabel="Password"
        className="input"
        placeholder="+6 Character"
        type="password"
        name="password"
      />

      <div className="auth__links">
        <Link to="/auth/forgotpassword">Forgot password ?</Link>
      </div>

      <button className="button" onClick={handleSubmit}>
        Login
      </button>

      <div className="auth__links">
        Don't have an account?
        <Link to="/auth/register"> Register</Link>
      </div>
    </div>
  );
};
export default Login;
