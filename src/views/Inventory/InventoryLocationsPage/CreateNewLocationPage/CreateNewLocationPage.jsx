import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast.js';
import Progress from '../../../../components/loading/Progress';
import countires from '../../../../assets/data/countries';

function CreateNewLocationPage() {
  //state
  const [isLoading, setIsLoading] = useState(true);
  //refs
  const successRef = useRef();
  const errorRef = useRef();

  //hooks
  const { register, handleSubmit } = useForm();

  //handlers
  //API
  async function sendData(data, e) {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        'api/v1/inventory/inventory-locations/',
        data
      );
      console.log(response.data);
      e.target.reset();
      setIsLoading(false);
      successToast('Created successfuly');
    } catch (err) {
      console.error(err);

      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
    }
  }

  //forms
  const onSubmit = (data, e) => {
    console.log(data);
    const apiData = {
      location_name: data.inventory_location_name,
      phone: data.inventory_location_phone,
      country: data.inventory_location_country,
      division: data.inventory_location_province,
      city: data.inventory_location_city,
      postal_code: data.inventory_location_postal_code,
      address1: data.inventory_location_address_line_1,
      address2: data.inventory_location_address_line_2,
      is_active: data.inventory_location_active,
      is_default: false,
    };
    sendData(apiData, e);
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
  // data for select option -> end

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />

        <div
          className="alert alert-danger"
          ref={errorRef}
          role="alert"
          style={{ display: 'none' }}
        >
          <button
            type="button"
            className="btn-custom-close close pull-right"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <strong>Problem occured during creating a new location</strong>
        </div>
        <div
          className="alert alert-success"
          ref={successRef}
          role="alert"
          style={{ display: 'none' }}
        >
          <button
            type="button"
            className="btn-custom-close close pull-right"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <strong>Successfully created a new location</strong>
        </div>
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Create New Location</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/inventory/locations" className="btn btn-primary">
              View All Locations
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title required">
                    Location Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('inventory_location_name', { required: true })}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    {...register('inventory_location_phone')}
                  />
                </div>
                <div className="mb-3 col-md-4 checkbox-container">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register('inventory_location_active')}
                    />
                    Active ?
                  </label>
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('inventory_location_address_line_1')}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('inventory_location_address_line_2')}
                  />
                </div>

                <div className="col-md-4"></div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">Country</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('inventory_location_country')}
                  >
                    <option value="">Choose..</option>
                    {countires.map((country, index) => {
                      return (
                        <option value={country} key={index}>
                          {country}
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
                    {...register('inventory_location_province')}
                  />
                </div>

                <div className="col-md-4"></div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">City</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('inventory_location_city')}
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
                    {...register('inventory_location_postal_code')}
                  />
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Create Location
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewLocationPage;
