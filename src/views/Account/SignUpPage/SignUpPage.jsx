import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './SignUpPage.css';

function SignUpPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <div className="full-page-center-container">
      <div className="panel-container">
        <div className="row signup-container">
          <div className="col-6">
            <h1 className="d-flex justify-content-center  black-font">
              Sign Up
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label row-option-title required"
                >
                  Email address
                </label>
                <input
                  type="email"
                  aria-describedby="emailHelp"
                  {...register('email_address', { required: true })}
                  className={`form-control ${
                    errors.email_address ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.email_address && "Can't be empty"}
                </div>
              </div>
              <div className="mb-3 ">
                <label
                  htmlFor="password"
                  className="form-label row-option-title required"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'You must specify a password',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  })}
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="confirm-password"
                  className="form-label row-option-title required"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register('confirm_password', {
                    required: 'You must specify a confirm password',
                    validate: (value) =>
                      value === watch('password') ||
                      'The passwords do not match',
                  })}
                  className={`form-control ${
                    errors.confirm_password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.confirm_password && (
                    <p>{errors.confirm_password.message}</p>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <p>Already have an account? &nbsp;</p>
                <p>
                  <Link to="/" className="link-text">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-6 d-flex align-items-center">
            <img
              src="/assets/images/big-logo.png"
              className="signup-company-logo"
            />
            {/* <h2 className="company-name black-font">Aporajita Tumi</h2> */}
            {/* <h2 className="company-name">Admin Panel</h2> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
