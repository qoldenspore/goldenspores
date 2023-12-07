import React, { useState, useEffect } from 'react';
import SignInContext from './signin-context';

const SignInProvider = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const getUserName = (name) => {
    setUsername(name);
  };
  const getEmail = (email) => {
    setEmail(email);
  };
  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };


  return (
    <SignInContext.Provider
      value={{
        email: email,
        username: username,
        getUserName: getUserName,
        getEmail: getEmail,
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </SignInContext.Provider>
  );
};

export default SignInProvider;
