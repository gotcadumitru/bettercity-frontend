import { authAPI } from '../../../api/api';
import { authToken } from '../../helpers/token';
import {
  confirmRegistartionAC,
  confirmRegistartionFailAC,
  confirmRegistartionSuccessAC,
  fetchAllUsersSuccessAC,
  fetchAuthUserAC,
  fetchAuthUserFailAC,
  fetchAuthUserSuccessAC,
  forgorPasswordAC,
  forgorPasswordFailAC,
  forgorPasswordSuccessAC,
  loginUserAC,
  loginUserFailAC,
  loginUserSuccessAC,
  registerNewUserAC,
  registerNewUserFailAC,
  registerNewUserSuccessAC,
  resetPasswordAC,
  resetPasswordFailAC,
  resetPasswordSuccessAC,
} from '../action/user.action';

export const fetchAuthUserThunk = () => async (dispatch) => {
  dispatch(fetchAuthUserAC());
  try {
    if (authToken.getToken()) {
      const response = await authAPI.getUserData();
      dispatch(fetchAuthUserSuccessAC(response.data));
    } else {
      throw new Error('No auth token');
    }
  } catch (err) {
    authToken.removeToken();
    dispatch(fetchAuthUserFailAC('Error'));
  }
};
export const fetchAllUsersThunk = () => async (dispatch) => {
  try {
    const response = await authAPI.getAllUsers();
    dispatch(fetchAllUsersSuccessAC(response.data));
  } catch (err) {
    console.log(err);
  }
};
export const registerNewUserThunk = (value) => async (dispatch) => {
  dispatch(registerNewUserAC());
  try {
    const response = await authAPI.register(value);
    dispatch(registerNewUserSuccessAC(response.data.message));
    authToken.setToken(response.data.accessToken);
    dispatch(fetchAuthUserThunk());
  } catch (error) {
    dispatch(registerNewUserFailAC(error?.response?.data?.message));
  }
};
export const loginThunk = (value) => async (dispatch) => {
  dispatch(loginUserAC());
  try {
    const response = await authAPI.login(value);
    authToken.setToken(response.data.accessToken);
    dispatch(loginUserSuccessAC());
    dispatch(fetchAuthUserThunk());
  } catch (error) {
    dispatch(loginUserFailAC(error.response.data.message));
  }
};
export const forgotPasswordThunk = (email) => async (dispatch) => {
  dispatch(forgorPasswordAC());
  try {
    const response = await authAPI.forgotPassword(email);
    dispatch(forgorPasswordSuccessAC(response.data.message));
  } catch (error) {
    dispatch(forgorPasswordFailAC(error.response.data.message));
  }
};
export const resetPasswordThunk = (password, resetToken) => async (dispatch) => {
  dispatch(resetPasswordAC());
  try {
    const response = await authAPI.resetPassword(password, resetToken);
    dispatch(resetPasswordSuccessAC(response.data.message));
  } catch (error) {
    dispatch(resetPasswordFailAC(error.response.data.message));
  }
};

export const changePasswordThunk = (newPassword, oldPassword) => async (dispatch) => {
  return await authAPI.changePassword(newPassword, oldPassword);
};
export const confirmRegistrationThunk = (confirmRegisterToken) => async (dispatch) => {
  dispatch(confirmRegistartionAC());
  try {
    const response = await authAPI.confirmRegistration(confirmRegisterToken);
    authToken.setToken(response.data.token);
    dispatch(confirmRegistartionSuccessAC(response.data.message));

    return response;
  } catch (error) {
    dispatch(confirmRegistartionFailAC(error.response.data.message));
  }
};
export const logOutThunk = () => async (dispatch) => {
  authToken.removeToken();
  dispatch(fetchAuthUserThunk());
};
