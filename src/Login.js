import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SignInImg from './Assets/signin-image.jpg';
import SignInContext from './Context/signin-context';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [storeUsername, setStoreUsername] = useState('');

  const { getEmail, getUserName, onLogin } = useContext(SignInContext);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const res = await axios.post(
        'https://goldensporesstore.000webhostapp.com/login.php',
        { ...formData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res);

      if (res) {
        console.log(res);
        const storedUsername = res.data.username;
        const storedEmail = res.data.email;

        localStorage.setItem('username', storedUsername);
        localStorage.setItem('email', storedEmail);
        localStorage.setItem('isLoggedIn', '1');
        getUserName(storedUsername);
        getEmail(storedEmail);
        setStoreUsername(storedUsername);
        onLogin();
        navigate('/home');
        window.location.reload();
      } else {
        setError(res.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };
  useEffect(() => {
    console.log(storeUsername);
  }, [storeUsername]);
  return (
    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={SignInImg} alt="" />
              </figure>
              <Link to="/sign-up" className="signup-image-link member">
                Create an account
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form
                method="POST"
                className="register-form"
                id="login-form"
                onSubmit={handleSubmit}
              >
                <p className="error">{error}</p>
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-account list-alt"></i>
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required=""
                    onChange={handleChange}
                    value={inputs.username}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    onChange={handleChange}
                    value={inputs.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    onChange={handleChange}
                    value={inputs.password}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                </div>
                <div className="form-group form-button my-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
