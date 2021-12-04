export const userActions = {
  FETCH_AUTH_USER: 'FETCH_AUTH_USER',
  FETCH_AUTH_USER_SUCCESS: 'FETCH_AUTH_USER_SUCCESS',
  FETCH_AUTH_USER_FAIL: 'FETCH_AUTH_USER_FAIL',

  LOGIN_USER: 'LOGIN_USER',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAIL: 'LOGIN_USER_FAIL',

  CONFIRM_REGISTRATION: 'CONFIRM_REGISTRATION',
  CONFIRM_REGISTRATION_SUCCESS: 'CONFIRM_REGISTRATION_SUCCESS',
  CONFIRM_REGISTRATION_FAIL: 'CONFIRM_REGISTRATION_FAIL',

  RESET_PASSWORD: 'RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAIL: 'RESET_PASSWORD_FAIL',

  REGISTER_NEW_USER: 'REGISTER_NEW_USER',
  REGISTER_NEW_USER_SUCCESS: 'REGISTER_NEW_USER_SUCCESS',
  REGISTER_NEW_USER_FAIL: 'REGISTER_NEW_USER_FAIL',

  RESET_AUTH_DATA: 'RESET_AUTH_DATA',

  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAIL: 'FORGOT_PASSWORD_FAIL',
  RESET_FORGOT_PASSWORD_STATUS: 'RESET_FORGOT_PASSWORD_STATUS',
};

export const fetchAuthUserAC = () => ({
  type: userActions.FETCH_AUTH_USER,
});
export const fetchAuthUserSuccessAC = (user) => ({
  type: userActions.FETCH_AUTH_USER_SUCCESS,
  payload: user,
});
export const fetchAuthUserFailAC = (errorMessage) => ({
  type: userActions.FETCH_AUTH_USER_FAIL,
  payload: errorMessage,
});

export const loginUserAC = () => ({
  type: userActions.LOGIN_USER,
});
export const loginUserSuccessAC = () => ({
  type: userActions.LOGIN_USER_SUCCESS,
});
export const loginUserFailAC = (errorMessage) => ({
  type: userActions.LOGIN_USER_FAIL,
  payload: errorMessage,
});

export const confirmRegistartionAC = () => ({
  type: userActions.CONFIRM_REGISTRATION,
});
export const confirmRegistartionSuccessAC = (message) => ({
  type: userActions.CONFIRM_REGISTRATION_SUCCESS,
  payload: message,
});
export const confirmRegistartionFailAC = (errorMessage) => ({
  type: userActions.CONFIRM_REGISTRATION_FAIL,
  payload: errorMessage,
});

export const resetPasswordAC = () => ({
  type: userActions.RESET_PASSWORD,
});
export const resetPasswordSuccessAC = (message) => ({
  type: userActions.RESET_PASSWORD_SUCCESS,
  payload: message,
});
export const resetPasswordFailAC = (errorMessage) => ({
  type: userActions.RESET_PASSWORD_FAIL,
  payload: errorMessage,
});

export const registerNewUserAC = () => ({
  type: userActions.REGISTER_NEW_USER,
});
export const registerNewUserSuccessAC = (message) => ({
  type: userActions.REGISTER_NEW_USER_SUCCESS,
  payload: message,
});
export const registerNewUserFailAC = (errorMessage) => ({
  type: userActions.REGISTER_NEW_USER_FAIL,
  payload: errorMessage,
});
export const resetAuthDataAC = () => ({
  type: userActions.RESET_AUTH_DATA,
});

export const forgorPasswordAC = () => ({
  type: userActions.FORGOT_PASSWORD,
});
export const forgorPasswordSuccessAC = (message) => ({
  type: userActions.FORGOT_PASSWORD_SUCCESS,
  payload: message,
});
export const forgorPasswordFailAC = (errorMessage) => ({
  type: userActions.FORGOT_PASSWORD_FAIL,
  payload: errorMessage,
});
export const resetForgorPasswordStatusAC = () => ({
  type: userActions.RESET_FORGOT_PASSWORD_STATUS,
});
