import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';
import './LogInPage.css';

function LogInPage({ setLoginStatus }) {
  //state
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //handlers

  //authentcation
  async function checkUser(data) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/api/login/', data);
      console.log(response.data);
      // store the user in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.access);
      //change status
      setLoginStatus(true);
      setIsLoading(false);
    } catch (err) {
      console.error(err.response.data);
      if (err.response.data.detail === 'Incorrect password!') {
        setErrorMessage('Invalid email or password.');
      } else {
        errorToast('An error occured');
      }
      //set error
      setIsLoading(false);
    }
  }

  //form
  const onSubmit = (data) => {
    console.log(data);
    // if (data.email_address !== '' && data.password !== '') {
    //   // <Redirect to="/" />;
    //   setLoginStatus(true);
    // }
    const apiData = {
      email: data.email_address,
      password: data.password,
    };
    checkUser(apiData);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <div className="main-container account-container full-page-center-container">
      <Progress isAnimating={isLoading} key={0} />
      <ToastContainer />
      <section className="image-bg">
        <div className="background-image-holder login-overlay" />
        <div className="container v-align-transform">
          <div className="login-container">
            <div className="feature bordered text-center form-container">
              <h4 className="account-page-title">Admin Login to Store</h4>
              <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => checkKeyDown(e)}
              >
                <div className="form-group">
                  <input
                    placeholder="Email Address"
                    type="email"
                    {...register('email_address', { required: true })}
                    className={`mid-input-box big-input ${
                      errors.email_address ? 'is-invalid' : ''
                    }`}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <input
                    className="big-input"
                    placeholder="Password"
                    type="password"
                    {...register('password', {
                      required: 'You must specify a password',
                    })}
                  />
                </div>

                {/* <p className="bg-danger text-center bg-red"></p> */}
                <p className="bg-danger text-center bg-red">{errorMessage}</p>
                <input
                  type="submit"
                  value="Sign in"
                  className="big-round-button"
                />
              </form>
              <p>
                <a className="forgot-password" href="/users/password/new">
                  Forgot your password?
                </a>
                <br />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LogInPage;
