import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast.js';
import Progress from '../../../../components/loading/Progress';

function CreateNewOutletPage() {
  //state
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    // if (data.outlet_active) {
    //   data.outlet_active = 'Yes';
    // } else {
    //   data.outlet_active = 'No';
    // }
    // if (data.cash_management_active) {
    //   data.cash_management_active = 'Yes';
    // } else {
    //   data.cash_management_active = 'No';
    // }
    sendData(data, e);
    console.log(data);
  };
  // data for select option -> start
  //   const provinceData = [
  //     'Barisal',
  //     'Chittagong',
  //     'Dhaka',
  //     'Khulna',
  //     'Mymensingh',
  //     'Rajshahi',
  //     'Rangpur',
  //     'Sylhet',
  //   ];
  const taxRateData = ['BD Government', 'Custom'];
  const [countriesList, setCountriesList] = useState([{}]);

  async function getCountriesList() {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();
    setCountriesList(data);
    return data;
  }
  // data for select option -> end

  // handlers
  //API
  async function sendData(data, e) {
    console.log(data);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('api/v1/pos/outlets/', data);
      e.target.reset();
      successToast('Created successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCountriesList();
    setIsLoading(false);
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Create New Outlet</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/pos/outlets" className="btn btn-success">
              View All Outlets
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title required">
                    Outlet Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('outlet_name', { required: true })}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    {...register('phone')}
                  />
                </div>
                <div className="mb-3 col-md-4 checkbox-container">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register('is_active')}
                    />
                    Active ?
                  </label>
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Outlet Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    {...register('outlet_email')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('address1')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('address2')}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Inventory Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('location_name')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">Country</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('country_name')}
                  >
                    <option value="">Choose..</option>
                    {countriesList.map((country, index) => {
                      return (
                        <option value={country.name} key={index}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Province
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('division')}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">City</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('city')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    className="form-control"
                    {...register('postal_code')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Tax Rate
                  </label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('tax')}
                  >
                    <option value="">Choose..</option>
                    {taxRateData.map((value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3 col-md-4 checkbox-container">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register('cash_management')}
                    />
                    Cash Management ?
                  </label>
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Create Outlet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewOutletPage;
