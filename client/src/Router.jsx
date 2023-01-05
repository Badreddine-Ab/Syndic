import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<LoginForm/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
