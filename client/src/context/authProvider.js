import { useState } from 'react';
import { Login, Logout } from './api';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (loginData) => {
    // Make the login API call using the login function you imported from the api file
    const result = await Login(loginData);
    if (result.message === 'Logged in successfully 😊 👌') {
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    // Make the logout API call using the logout function you imported from the api file
    const result = await Logout();
    if (result.message === 'Successfully logged out 😏 🍀') {
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
