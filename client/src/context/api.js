import axios from 'axios';

export const baseURL = 'http://localhost:8080/api';

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, loginData);
    
    console.log(response)
    return response.data;
    
  } catch (error) {
    console.log(error.response)
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

