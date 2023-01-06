import React from 'react';
import logo from '../assets/images/gestion-syndic-de-copropriete-à-Le-Mans-Sarthe-72.png'
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import { login } from '../context/api';
import { useState } from 'react';



const LoginForm = () => {
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // get the login function from the AuthContext
  const [errorMessage, setErrorMessage] =useState('')


  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    
    const loginData = {
      email: event.target.elements.email.value ,
      password: event.target.elements.password.value 
    };
  

    // console.log(loginData.email)
    // console.log(loginData.password)
    // call the login function with the login data
    try {
      await login(loginData)
      await setIsLoggedIn(true)
      console.log(isLoggedIn)
      navigate('/dashboard')

    } catch (error) {
      await setIsLoggedIn(false)
      console.log("errooooor")
      setErrorMessage('Something went wrong,try again')
    }

  };


  return (
    <div className="bg-pink-900 flex items-center justify-center h-screen w-screen">
    <div className="w-full max-w-xs">
    <span className='m-9 text-red-300'> {errorMessage}</span>
      <div className="bg-pink-50 p-4 rounded-lg shadow-lg">
        <img src={logo} alt="Logo" className="mx-auto h-16 w-auto" />
    <form className="mx-auto  max-w-xs" onSubmit={handleSubmit}>
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
      Log in
      </button>
    </form>
    </div>
      </div>
    </div>
  );
};

export default LoginForm;
