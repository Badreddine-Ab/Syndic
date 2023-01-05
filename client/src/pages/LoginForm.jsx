import React from 'react';
import logo from '../assets/images/gestion-syndic-de-copropriete-à-Le-Mans-Sarthe-72.png'
import { Link } from 'react-router-dom';
import axios from 'axios'

const LoginForm = () => {


    

  return (
    <div className="bg-pink-900 flex items-center justify-center h-screen w-screen">
    <div className="w-full max-w-xs">
      <div className="bg-pink-50 p-4 rounded-lg shadow-lg">
        <img src={logo} alt="Logo" className="mx-auto h-16 w-auto" />
    <form className="mx-auto  max-w-xs ">
      <div className="mb-4">
        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="email" />
      </div>
      <div className="mb-4">
        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner" type="password" id="password" />
      </div>
      <button className="bg-pink-900 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-2xl mx-auto w-auto" type="submit">
      <Link to="/dashboard">Log in</Link>
      </button>
    </form>
    </div>
      </div>
    </div>
  );
};

export default LoginForm;
