import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast.js';
import Progress from '../../../../components/loading/Progress';
import countries from '../../../../assets/data/countries';

function CreateNewSupplierPage() {
  //state
  const [isLoading, setIsLoading] = useState(true);

  //state
  const [taxOptions, setTaxOptions] = useState([]);
  const taxRateData = taxOptions;

  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handlers
  //API
  async function sendData(data, e) {
    console.log(data);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        'api/v1/inventory/suppliers/',
        data
      );
      console.log(response.data);
      e.target.reset();
      successToast('Created successfuly');
      setIsLoading(false);
    } catch (err) {
      console.error(err);

      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }

  //form
  const onSubmit = (data, e) => {
    console.log(data);
    const apiData = {
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
    sendData(apiData, e);
  };

  useEffect(() => {
    //get tax data
    setTaxOptions(['BD Government', 'Custom']);
    setIsLoading(false);
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />

        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Create New Supplier</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/inventory/suppliers" className="btn btn-primary">
              View All Suppliers
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label className="form-label row-option-title required">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.supplier_name ? 'is-invalid' : ''
                    }`}
                    {...register('supplier_name', { required: true })}
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
                    className={`form-control ${
                      errors.supplier_company_name ? 'is-invalid' : ''
                    }`}
                    {...register('supplier_company_name', { required: true })}
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
                    className={`form-control ${
                      errors.supplier_first_name ? 'is-invalid' : ''
                    }`}
                    {...register('supplier_first_name', { required: true })}
                  />
                  <div className="invalid">
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
                Create Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewSupplierPage;
