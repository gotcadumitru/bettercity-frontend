export const getCurrentUser = (state) => {
  return state.profileInfo.user;
};

export const getProfileInfo = (state) => {
  return state.profileInfo;
};

export const getUserAuthStatus = (state) => {
  return state.profileInfo.isAuth;
};
