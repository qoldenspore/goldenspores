import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignUpImg from './Assets/signup-image.jpg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    cPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const formData = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      cPassword: inputs.cPassword,
    };
        const signUpAsync = async (formData) => {
          try {
            const response = await axios.post(
              'https://goldensporesstore.000webhostapp.com/signup.php',
              formData,
            );
            console.log(inputs);
            console.log(response.data);
            setPasswordError(response.data.passwordError);
            setError(response.data.failed);
            setSuccess(response.data.success);
          } catch (error) {
            console.error('Error signing up:', error);
          }
        };
        signUpAsync(formData);
  };

  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form
                method="POST"
                className="register-form"
                id="register-form"
                onSubmit={signupHandler}
              >
                <p className="error">{error}</p>
                <p className="error">{passwordError}</p>
                <p className="success">{success}</p>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={inputs.password}
                    required
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    name="cPassword"
                    value={inputs.cPassword}
                    placeholder="Confirm password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                </div>
                <div className="form-group form-button my-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={SignUpImg} alt="" />
              </figure>
              <Link to="/" className="signup-image-link member">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
