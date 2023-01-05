import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from './context/authContext';
import {AuthProvider} from './context/authProvider'
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';




export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/"  />
}

// authorized so return child components
return children;
};

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<LoginForm />} />
        <Route path="/dashboard" element={<PrivateRoute component={<Dashboard/>} />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
export default Router;
