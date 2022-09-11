import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast';
import Progress from '../../../../components/loading/Progress.jsx';

function AddNewCustomerGroupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  //API
  async function saveData(data) {
    setIsLoading(true);
    try {
      await axiosInstance.post('api/v1/customer/customer-group-list/', data);
      successToast('Created successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  //form
  const onSubmit = (data) => {
    saveData(data);
  };
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />

        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">New Customer Group</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/customers/manage" className="btn btn-primary">
              View All Groups
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <p className="row-option-title col-12">New Customer Group</p>
          <br />
          <br />
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-12">
                  <label className="form-label required row-option-title">
                    Customer group name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    {...register('group_name', { required: true })}
                  />
                  <div className="invalid-feedback">
                    {errors.group_name && "Can't be empty"}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Create New Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCustomerGroupPage;
