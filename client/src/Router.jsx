// import React, {  Fragment } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  // Navigate
} from "react-router-dom";

import {AuthProvider} from './context/authProvider'
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
// import { isAuthenticated } from './helper/authenticated';



// const PrivateRoute = ({ children }) => {
  
//   return isAuthenticated() ? (
//       <Fragment>
//           {children}
//       </Fragment>
//   ) : <Navigate to="/" />
// }

// const PublicRoute = ({ children }) => {
//   return isAuthenticated() ? <Navigate to="/dashboard" /> : children
// }





const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<LoginForm /> } />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
export default Router;
