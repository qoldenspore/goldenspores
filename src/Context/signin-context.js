import React from 'react';

const SignInContext = React.createContext({
  email: '',
  username: '',
  getUserName: (username) => {},
  getEmail: (email) => {},
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export default SignInContext;
