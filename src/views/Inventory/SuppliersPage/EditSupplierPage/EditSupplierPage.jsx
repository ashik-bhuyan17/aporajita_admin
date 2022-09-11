import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import countries from '../../../../assets/data/countries';

function EditSupplierPage() {
  const [taxOptions, setTaxOptions] = useState([]);
  const taxRateData = taxOptions;
  //axios
  axios.defaults.baseURL = 'http://localhost:8000/';
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.withCredentials = true;

  //refs
  const successRef = useRef();
  const errorRef = useRef();
  // hooks
  const location = useLocation();
  /* making ready to intialize previousData */
  const previousData = location.state;
  console.log(previousData);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      supplier_name: previousData.supplier_name,
      supplier_company_name: previousData.supplier_company_name,
      supplier_first_name: previousData.supplier_first_name,
      supplier_last_name: previousData.supplier_last_name,
      supplier_phone: previousData.supplier_phone,
      supplier_address_line_1: previousData.supplier_address,
      supplier_address_line_2: previousData.supplier_address2,
      supplier_city: previousData.city,
      supplier_country: previousData.country,
      supplier_province: previousData.division,
      supplier_active: previousData.is_active,
      supplier_tax_rate: previousData.tax,
      supplier_postal_code: previousData.postal_code,
    },
  });

  //API handler
  async function sendData(data) {
    console.log(data);
    try {
      const response = await axios.put(
        `api/v1/inventory/supplier-details/${previousData.id}/`,
        data
      );
      console.log(response.data);
      successRef.current.style.display = 'block';
    } catch (err) {
      console.error(err);
      errorRef.current.style.display = 'block';
    }
  }
  //form handler
  const onSubmit = (data) => {
    console.log(data);
    const apiData = {
      ...previousData,
      supplier_company_name: data.supplier_company_name,
      supplier_name: data.supplier_name,
      supplier_first_name: data.supplier_first_name,
      supplier_last_name: data.supplier_last_name,
      supplier_phone: data.supplier_phone,
      country: data.supplier_country,
      division: data.supplier_province,
      postal_code: data.supplier_postal_code,
      city: data.supplier_city,
      supplier_address: data.supplier_address_line_1,
      supplier_address2: data.supplier_address_line_2,
      tax: data.supplier_tax_rate,
      is_active: data.supplier_active,
    };
    sendData(apiData);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  useEffect(() => {
    //get tax data
    setTaxOptions(['BD Government', 'Custom']);
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
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
          <strong>Problem occured during updaing supplier information</strong>
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
          <strong>Successfully upated supplier information</strong>
        </div>
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Edit Supplier</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/inventory/suppliers" className="btn btn-success">
              View All Suppliers
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
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    {...register('supplier_name', { required: true })}
                    className={`form-control ${
                      errors.supplier_name ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.supplier_name && "Can't be empty"}
                  </div>
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title required">
                    Compnay Name
                  </label>
                  <input
                    type="text"
                    {...register('supplier_company_name', { required: true })}
                    className={`form-control ${
                      errors.supplier_company_name ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.supplier_company_name && "Can't be empty"}
                  </div>
                </div>
                <div className="mb-3 col-md-4 checkbox-container">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register('supplier_active')}
                    />
                    Active ?
                  </label>
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title required">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register('supplier_first_name', { required: true })}
                    className={`form-control ${
                      errors.supplier_first_name ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.supplier_first_name && "Can't be empty"}
                  </div>
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('supplier_last_name')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    {...register('supplier_phone')}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('supplier_address_line_1')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('supplier_address_line_2')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">City</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('supplier_city')}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">Country</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('supplier_country')}
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
                    {...register('supplier_province')}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Tax Rate
                  </label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('supplier_tax_rate')}
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

                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    className="form-control"
                    {...register('supplier_postal_code')}
                  />
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Save Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSupplierPage;
