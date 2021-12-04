import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from '../../common/state/reducer/user.reducer';
import { handleIsNotificationShowAC } from '../../common/state/action/notification.action';
import { resetAuthDataAC } from '../../common/state/action/user.action';
import { registerNewUserThunk } from '../../common/state/thunk/user.thunk';
import Input from '../../common/components/common/Input';
const initialRegisterData = {
  name: {
    value: '',
    errorMessage: '',
  },
  surname: {
    value: '',
    errorMessage: '',
  },
  email: {
    value: '',
    errorMessage: '',
  },
  password: {
    value: '',
    errorMessage: '',
  },
  checkBox: {
    value: false,
    errorMessage: '',
  },
};
const Register = (props) => {
  const dispatch = useDispatch();
  const { registerNewUser } = useSelector((state) => state.profileInfo);
  const history = useHistory();
  useEffect(() => {
    if (registerNewUser.registerFetchStatus === FetchStatus.SUCCESS || registerNewUser.registerFetchStatus === FetchStatus.FAIL) {
      dispatch(handleIsNotificationShowAC(true, registerNewUser.registerFetchStatus === FetchStatus.FAIL, registerNewUser.message));
    }
    if (registerNewUser.registerFetchStatus === FetchStatus.SUCCESS) {
      handleRegisterData(initialRegisterData);
      history.push('/');
    }
  }, [registerNewUser]);
  useEffect(() => {
    return () => dispatch(resetAuthDataAC());
  }, []);
  const [registerData, handleRegisterData] = useState({ ...initialRegisterData });

  const handleSubmit = (e) => {
    if (checkIfExistErrors()) return;
    dispatch(
      registerNewUserThunk({
        name: registerData.name.value,
        surname: registerData.surname.value,
        email: registerData.email.value,
        password: registerData.password.value,
      })
    );
  };

  const checkIfExistErrors = () => {
    let isErrors = false;
    let { checkBox, ...formDataCopy } = JSON.parse(JSON.stringify(registerData));

    Object.keys(formDataCopy).forEach((key) => {
      if (!formDataCopy[key].value) {
        isErrors = true;
        formDataCopy[key].errorMessage = 'This field is required';
      }
    });
    if (!checkBox.value) {
      checkBox.errorMessage = 'Accept the terms and services';
      isErrors = true;
    }
    if (isErrors) {
      handleRegisterData({ checkBox, ...formDataCopy });
    }
    return isErrors;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    handleRegisterData({
      ...registerData,
      [name]: {
        errorMessage: '',
        value,
      },
    });
  };
  const handleChageCheckBox = (e) => {
    const { name, checked } = e.target;

    handleRegisterData({
      ...registerData,
      [name]: {
        errorMessage: '',
        value: checked,
      },
    });
  };

  return (
    <div className="auth__register">
      <h2 className="auth__title">Create Account</h2>

      <div className="auth__or">or</div>

      <Input
        onChange={handleChangeInput}
        errorMessage={registerData.name.errorMessage}
        value={registerData.name.value}
        inputLabel="Name"
        className="input"
        placeholder="John"
        type="text"
        name="name"
      />
      <Input
        onChange={handleChangeInput}
        errorMessage={registerData.surname.errorMessage}
        value={registerData.surname.value}
        inputLabel="Surname"
        className="input"
        placeholder="Doe"
        type="text"
        name="surname"
      />
      <Input
        onChange={handleChangeInput}
        errorMessage={registerData.email.errorMessage}
        name="email"
        value={registerData.email.value}
        inputLabel="Email Adress"
        className="input"
        placeholder="yadima@gmail.com"
        type="email"
      />
      <Input
        onChange={handleChangeInput}
        errorMessage={registerData.password.errorMessage}
        value={registerData.password.value}
        inputLabel="Password"
        className="input"
        placeholder="+6 Character"
        type="password"
        name="password"
      />

      <div className="auth__agree">
        <div>
          <input onChange={handleChageCheckBox} type="checkbox" name="checkBox" />
          <span className="auth__agree-text">I agree with term and services</span>
          {registerData.checkBox.errorMessage && <div className="input__error">{registerData.checkBox.errorMessage}</div>}
        </div>
      </div>

      <button className="button" onClick={handleSubmit}>
        Create Account
      </button>

      <div className="auth__links">
        Have an account?
        <Link to="/auth/login"> Log In</Link>
      </div>
    </div>
  );
};
export default Register;
