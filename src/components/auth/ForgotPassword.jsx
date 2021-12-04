import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../common/components/common/Input';
import { handleIsNotificationShowAC } from '../../common/state/action/notification.action';
import { resetAuthDataAC } from '../../common/state/action/user.action';
import { FetchStatus } from '../../common/state/reducer/user.reducer';
import { forgotPasswordThunk } from '../../common/state/thunk/user.thunk';

const initialForgotPasswordValues = {
  email: {
    value: '',
    errorMessage: '',
  },
};
const ForgotPassword = (props) => {
  const { forgotPassword } = useSelector((state) => state.profileInfo);
  const [forgotPasswordData, handleForgotPasswordData] = useState({ ...initialForgotPasswordValues });
  const dispatch = useDispatch();
  useEffect(() => {
    if (forgotPassword.fetchStatus === FetchStatus.SUCCESS || forgotPassword.fetchStatus === FetchStatus.FAIL) {
      dispatch(handleIsNotificationShowAC(true, forgotPassword.fetchStatus === FetchStatus.FAIL, forgotPassword.message));
    }
    // eslint-disable-next-line
  }, [forgotPassword]);
  useEffect(() => {
    return () => dispatch(resetAuthDataAC());
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    if (checkIfExistErrors()) return;
    dispatch(forgotPasswordThunk(forgotPasswordData.email.value));
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    handleForgotPasswordData({
      ...forgotPasswordData,
      [name]: {
        errorMessage: '',
        value,
      },
    });
  };

  const checkIfExistErrors = () => {
    let isErrors = false;
    let formDataCopy = JSON.parse(JSON.stringify(forgotPasswordData));

    Object.keys(formDataCopy).forEach((key) => {
      if (!formDataCopy[key].value) {
        isErrors = true;
        formDataCopy[key].errorMessage = 'This field is required';
      }
    });
    if (isErrors) {
      handleForgotPasswordData(formDataCopy);
    }
    return isErrors;
  };

  return (
    <div className="auth__forgot-password">
      <h2 className="auth__title">Reset password</h2>
      <Input
        onChange={handleChangeInput}
        errorMessage={forgotPasswordData.email.errorMessage}
        name="email"
        value={forgotPasswordData.email.value}
        inputLabel="Email Adress"
        className="input"
        placeholder="yadima@gmail.com"
        type="email"
      />
      <br />
      <button className="button" onClick={handleSubmit}>
        Send Email
      </button>

      <div className="auth__links">
        Go back to
        <Link to="/auth/login"> Log In</Link>
      </div>
    </div>
  );
};
export default ForgotPassword;
