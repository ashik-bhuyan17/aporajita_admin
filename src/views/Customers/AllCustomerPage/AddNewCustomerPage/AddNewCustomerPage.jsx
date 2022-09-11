import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast';
import Progress from '../../../../components/loading/Progress.jsx';

function AddNewCustomerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Handlers
  //API
  async function saveData(data) {
    setIsLoading(true);
    const allData = { ...data };
    allData.image = null;
    console.log('all data', allData);
    delete allData['customer_number']; //TD
    try {
      await axiosInstance.post(
        'api/v1/customer/customer-profile-create/',
        allData
      );
      successToast('Created successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  //FORM
  const onSubmit = (data) => {
    console.log(data);
    saveData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Add New Customer</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-muted">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/customers">Customers</Link>
            </li>
            <li className="breadcrumb-item">Add New Customer</li>
          </ol>
        </nav>
        <div className="panel-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-12">
                  <label className="form-label required row-option-title">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    {...register('email', { required: true })}
                  />
                  <div className="invalid-feedback">
                    {errors.email && "Can't be empty"}
                  </div>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Title</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('title')}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('first_name')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('last_name')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Gender</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('gender')}
                  >
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                    <option value="OTHERS">Other</option>
                  </select>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register('phone')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Customer number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    {...register('customer_number')}
                  />
                </div>
              </div>
            </div>
            <p className="row-option-title">
              A password will generate automatically & an email with username
              and password will be delivered to the registered email in no time.
            </p>
            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Save Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCustomerPage;
