import axios from 'axios';

export const baseURL = 'http://localhost:8080/api';

export const Login = async (loginData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

