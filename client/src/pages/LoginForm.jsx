import React, { useState, useEffect } from 'react';


// import { setTheme } from './actions/themeActions';

const LoginForm = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };
  
    useEffect(() => {
      localStorage.setItem('theme', theme);
    }, [theme]); // this will run the effect only when the theme changes
  
    useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }, []); // this will run the effect only once when the component mounts
  

  return (
    <div className={`h-screen flex justify-center items-center bg-${theme}-500`}>
      <form className={`w-full max-w-sm bg-${theme}-100 shadow-lg rounded-lg p-6`}>
        <div className="mb-4">
          <label className={`block text-${theme}-800 text-sm font-bold mb-2`} htmlFor="email">
            email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-${theme}-800 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className={`block text-${theme}-800 text-sm font-bold mb-2`} htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-${theme}-800 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="********"
          />
          <p className={`text-${theme}-600 text-xs italic`}>Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-${theme}-800 hover:bg-${theme}-700 text-${theme}-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
          >
            Sign In
          </button>
          
        </div>
        <button onClick={toggleTheme} className="btn-gray font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Toggle Theme
      </button>
      </form>
    </div>
  );
};

export default LoginForm;
