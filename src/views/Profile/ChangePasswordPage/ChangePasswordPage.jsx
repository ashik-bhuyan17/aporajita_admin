import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  //hooks
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //handler
  const saveData = async (data) => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.user);
      await axiosInstance.put(
        `auth/api/change-password/${user.user_id}/`,
        data
      );
      successToast('Password has changed successfuly');
    } catch (err) {
      errorToast('An error occured');
      console.log(err);
    }
    setIsLoading(false);
  };
  const onSubmitHandler = (data) => {
    console.log(data);
    saveData(data);
  };

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container">
          <h1 className="page-title">Change Password</h1>
        </div>
        <div className="panel-container">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="row">
              <div className="mb-3 col-12">
                <label className="row-option-title required">
                  New Password
                </label>
                <input
                  type="password"
                  {...register('new_password', { required: true })}
                  className={`form-control ${
                    errors.new_password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.new_password && "Can't be empty"}
                </div>
              </div>
              <div className="mb-3 col-12">
                <label className="row-option-title">Retype New password</label>
                <input
                  type="password"
                  {...register('retype_new_password', {
                    required: true,
                    validate: (value) =>
                      value === watch('new_password') ||
                      'The passwords do not match',
                  })}
                  className={`form-control ${
                    errors.retype_new_password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.retype_new_password && (
                    <p>{errors.retype_new_password.message}</p>
                  )}
                </div>
              </div>
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
