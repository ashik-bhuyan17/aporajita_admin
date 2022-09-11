import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast.js';
import Progress from '../../../../components/loading/Progress';

function EditOutletPage() {
  //state
  const [isLoading, setIsLoading] = useState(true);

  // hooks
  const location = useLocation();
  const previousData = location.state;
  /* making ready to intialize previousData */
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      ...previousData,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    sendData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const taxRateData = ['BD Government', 'Custom'];
  const [countriesList, setCountriesList] = useState([{}]);

  async function getCountriesList() {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();
    setCountriesList(data);
    return data;
  }
  // data for select option -> end

  //   nameRef.current.value = previousData.outlet_name;

  // handlers
  //API
  async function sendData(data, e) {
    console.log(data);
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(
        `api/v1/pos/outlet-details/${previousData.id}/`,
        data
      );
      successToast('Updated successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCountriesList();
    setIsLoading(false);
    console.log(previousData);
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Edit Outlet</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/pos/outlets" className="btn btn-success">
              View All Outlets
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
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
                Update Outlet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOutletPage;
