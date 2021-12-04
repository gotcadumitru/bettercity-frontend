import { userActions } from '../action/user.action';
export const FetchStatus = {
  NULL: 'NULL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};
const initialState = {
  user: {
    data: null,
    fetchStatus: FetchStatus.NULL,
    message: '',
  },
  forgotPassword: {
    fetchStatus: FetchStatus.NULL,
    message: '',
  },
  registerNewUser: {
    registerFetchStatus: FetchStatus.NULL,
    message: '',
  },
  login: {
    fetchStatus: FetchStatus.NULL,
    message: '',
  },
  confirmRegistration: {
    fetchStatus: FetchStatus.NULL,
    message: '',
  },
  resetPassword: {
    fetchStatus: FetchStatus.NULL,
    message: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.FETCH_AUTH_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    }
    case userActions.FETCH_AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload,
          fetchStatus: FetchStatus.SUCCESS,
        },
      };
    }
    case userActions.FETCH_AUTH_USER_FAIL: {
      return {
        ...state,
        user: {
          ...state.user,
          data: null,
          fetchStatus: FetchStatus.FAIL,
          message: action.payload,
        },
      };
    }

    case userActions.LOGIN_USER: {
      return {
        ...state,
        login: {
          ...state.login,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    }
    case userActions.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        login: {
          ...state.login,
          fetchStatus: FetchStatus.SUCCESS,
          message: '',
        },
      };
    }
    case userActions.LOGIN_USER_FAIL: {
      return {
        ...state,
        login: {
          ...state.login,
          fetchStatus: FetchStatus.FAIL,
          message: action.payload,
        },
      };
    }

    case userActions.CONFIRM_REGISTRATION: {
      return {
        ...state,
        confirmRegistration: {
          ...state.confirmRegistration,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    }
    case userActions.CONFIRM_REGISTRATION_SUCCESS: {
      return {
        ...state,
        confirmRegistration: {
          ...state.confirmRegistration,
          fetchStatus: FetchStatus.SUCCESS,
          message: action.payload,
        },
      };
    }
    case userActions.CONFIRM_REGISTRATION_FAIL: {
      return {
        ...state,
        confirmRegistration: {
          ...state.confirmRegistration,
          fetchStatus: FetchStatus.FAIL,
          message: action.payload,
        },
      };
    }

    case userActions.RESET_PASSWORD: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    }
    case userActions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetchStatus: FetchStatus.SUCCESS,
          message: action.payload,
        },
      };
    }
    case userActions.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetchStatus: FetchStatus.FAIL,
          message: action.payload,
        },
      };
    }

    case userActions.REGISTER_NEW_USER: {
      return {
        ...state,
        registerFetchStatus: FetchStatus.IN_PROGRESS,
      };
    }
    case userActions.REGISTER_NEW_USER_SUCCESS: {
      return {
        ...state,
        registerNewUser: {
          registerFetchStatus: FetchStatus.SUCCESS,
          message: action.payload,
        },
      };
    }
    case userActions.REGISTER_NEW_USER_FAIL: {
      return {
        ...state,
        user: {
          ...state.user,
          data: null,
        },
        registerNewUser: {
          registerFetchStatus: FetchStatus.FAIL,
          message: action.payload,
        },
      };
    }
    case userActions.RESET_AUTH_DATA: {
      const { user, ...stateWithoutUser } = initialState;
      return {
        ...state,
        ...stateWithoutUser,
      };
    }

    case userActions.FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPassword: {
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    }
    case userActions.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassword: {
          fetchStatus: FetchStatus.SUCCESS,
          message: action.payload,
        },
      };
    }
    case userActions.FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        user: {
          ...state.user,
          data: null,
        },
        forgotPassword: {
          fetchStatus: FetchStatus.FAIL,
          message: action.payload,
        },
      };
    }
    case userActions.RESET_FORGOT_PASSWORD_STATUS: {
      return {
        ...state,
        forgotPassword: {
          fetchStatus: FetchStatus.NULL,
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
