import axios from 'axios';
import { authToken } from '../common/helpers/token';

let instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const authAPI = {
  async getUserData() {
    return instance.get(`/me`, {
      headers: {
        Authorization: 'Bearer ' + authToken.getToken(),
      },
    });
  },
  async getAllUsers() {
    return instance.get(`/users`, {
      headers: {
        Authorization: 'Bearer ' + authToken.getToken(),
      },
    });
  },

  async register({ name, surname, email, password, ...other }) {
    return instance.post(`/register`, {
      name: `${name} ${surname}`,
      email,
      password,
      role: 'citizen',
    });
  },

  async login({ email, password }) {
    return instance.post(`/login`, {
      email,
      password,
    });
  },
  async changePassword(newPassword, oldPassword) {
    return instance.post(
      `api/auth/changepassword`,
      {
        newPassword,
        oldPassword,
      },
      {
        headers: {
          'auth-token': authToken.getToken(),
        },
      }
    );
  },

  async forgotPassword(email) {
    return instance.post(`api/auth/forgotpassword`, {
      email,
    });
  },
  async resetPassword(password, resetToken) {
    return instance.post(`api/auth/resetpassword/${resetToken}`, {
      password,
    });
  },
  async confirmRegistration(confirmRegisterToken) {
    return instance.post(`api/auth/confirmRegister/${confirmRegisterToken}`, {});
  },
};

export const otherAPI = {
  async addIssue(data) {
    return instance.post(`/issues/create`, data, {
      headers: {
        Authorization: 'Bearer ' + authToken.getToken(),
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
  async getAllIssues() {
    return instance.get(`/issues`, {
      headers: {
        Authorization: 'Bearer ' + authToken.getToken(),
      },
    });
  },
  async getIssue(id) {
    return instance.get(`/issues/${id}`, {
      headers: {
        Authorization: 'Bearer ' + authToken.getToken(),
      },
    });
  },
  async getStatistics() {
    return instance.get(`/statistics`, {
      headers: {
        Authorization: 'Bearer ' + authToken.getToken(),
      },
    });
  },
};
