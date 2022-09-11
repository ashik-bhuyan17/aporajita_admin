import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function UpdateProfilePage() {
  const [isLoading, setIsLoading] = useState(false);

  //state
  const [data, setData] = useState();

  //hooks
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { data },
  });

  //handler
  const saveData = async (data) => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.user);
      await axiosInstance.put(
        `auth/api/user-info-update/${user.user_id}/`,
        data
      );
      successToast('Profile updated successfuly');
    } catch (err) {
      errorToast('An error occured');
      console.log(err);
    }
    setIsLoading(false);
  };
  const getData = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.user);
      const response = await axiosInstance.get(
        `auth/api/user-info-update/${user.user_id}/`
      );
      setData(response.data);
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
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container">
          <h1 className="page-title">Update Your Profile</h1>
        </div>
        <div className="panel-container">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-3 col-12">
              <label className="row-option-title required">First Name</label>
              <input
                type="text"
                {...register('first_name', { required: true })}
                className={`form-control ${
                  errors.first_name ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.first_name && "Can't be empty"}
              </div>
            </div>
            <div className="mb-3 col-12">
              <label className="row-option-title">Last Name</label>
              <input
                type="text"
                className="form-control"
                {...register('last_name')}
              />
            </div>
            <div className="mb-3 col-12">
              <label className="row-option-title required">Phone Number</label>
              <input
                type="text"
                {...register('phone', { required: true })}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              <span className="help-block">
                New order notification SMS will be sent to this number. Valid
                number formats are: +8801712345678 and 01712345678
              </span>
              <div className="invalid-feedback">
                {errors.phone && "Can't be empty"}
              </div>
            </div>
            <div className="mb-3 col-12">
              <label className="row-option-title">Address</label>
              <textarea
                type="text"
                className="form-control"
                {...register('address')}
              />
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
