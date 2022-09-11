import axios from 'axios';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import axiosInstance from '../../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../../helpers/toast.js';
import Progress from '../../../../components/loading/Progress';
import countries from '../../../../assets/data/countries';

function EditInventoryLocationPage() {
  const [isLoading, setIsLoading] = useState(true);

  // hooks
  const location = useLocation();
  /* making ready to intialize previousData */
  const previousData = location.state;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      inventory_location_name: previousData.location_name,
      inventory_location_phone: previousData.phone,
      inventory_location_active: previousData.is_active,
      inventory_location_address_line_1: previousData.address1,
      inventory_location_address_line_2: previousData.address2,
      inventory_location_country: previousData.country,
      inventory_location_province: previousData.division,
      inventory_location_city: previousData.city,
      inventory_location_postal_code: previousData.postal_code,
    },
  });

  //handlers
  //API
  async function sendData(data) {
    console.log(data);
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(
        `api/v1/inventory/update-inventory-location/${previousData.id}/`,
        data
      );
      console.log(response.data);
      successToast('Updated successfuly');
      setIsLoading(false);
    } catch (err) {
      console.error(err);

      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  //forms
  const onSubmit = (data) => {
    console.log(data);
    const apiData = {
      ...previousData,
      location_name: data.inventory_location_name,
      phone: data.inventory_location_phone,
      country: data.inventory_location_country,
      division: data.inventory_location_province,
      city: data.inventory_location_city,
      postal_code: data.inventory_location_postal_code,
      address1: data.inventory_location_address_line_1,
      address2: data.inventory_location_address_line_2,
      is_active: data.inventory_location_active,
    };
    sendData(apiData);
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
          <h1 className="page-title col-xs-12 col-md-6">Edit Location</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/inventory/locations" className="btn btn-primary">
              View All Locations
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
                    Location Name
                  </label>
                  <input
                    type="text"
                    {...register('inventory_location_name', { required: true })}
                    className={`form-control ${
                      errors.inventory_location_name ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.inventory_location_name && "Can't be empty"}
                  </div>
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
                    {countries.map((country, index) => {
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
                Save Location
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditInventoryLocationPage;
