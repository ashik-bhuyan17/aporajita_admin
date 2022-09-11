import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUsers } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail, MdCall } from 'react-icons/md';

import OrderHistoryTable from '../../../../components/table/SpecificPage/Customers/OrderHistoryTable';
import { columns, data } from './demoData';
import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast';
// import Progress from '../../../../components/loading/Progress';
// import Pagination from '../../../../components/others/pagination';

function EditCustomerPage() {
  // hooks
  const location = useLocation();
  const previousData = location.state;
  const [accountInformation, setAccountInformation] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [billingInformation, setBillingInformation] = useState(true);
  const [shippingInformation, setShippingInformation] = useState(false);
  const [orderHistory, setOrderHistory] = useState(false);

  const [billingData, setBillingData] = useState({ found: false, data: [] });
  const [shippingData, setShippingData] = useState({ found: false, data: [] });
  // refs
  const accountPageRef = useRef();
  const billingShippingPageRef = useRef();
  const addAddressPageRef = useRef();
  const orderHistoryPageRef = useRef();
  const billingAddressRef = useRef();
  const billingInformationTab = useRef();
  const shippingAddressRef = useRef();
  const shippingInformationTab = useRef();
  // data for select option -> start
  const provinceData = [
    'Barisal',
    'Chittagong',
    'Dhaka',
    'Khulna',
    'Mymensingh',
    'Rajshahi',
    'Rangpur',
    'Sylhet',
  ];
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createAddress(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  // form
  const {
    register: edit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm({
    defaultValues: {
      ...previousData,
    },
  });
  //handlers
  //API
  async function updateData(data) {
    const allData = { ...previousData, ...data };
    try {
      await axiosInstance.put(
        `api/v1/customer/customer-profile-details/${data.id}/`,
        allData
      );
      successToast('Created successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  async function createAddress(data) {
    data.customer = previousData.id;
    try {
      await axiosInstance.post(
        `api/v1/customer/customer-address-create/${previousData.id}/`,
        data
      );
      successToast('Created successfuly');
      data.type === 'BILLING' && getBillingAddress();
      data.type === 'SHIPPING' && getShippingAddress();
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  async function getShippingAddress() {
    try {
      const response = await axiosInstance.get(
        `api/v1/customer/customer-shipping-address-details/${previousData.id}/`
      );
      setShippingData({ found: true, data: response.data });
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setShippingData({ found: false, data: [] });
    }
  }
  async function getBillingAddress() {
    try {
      const response = await axiosInstance.get(
        `api/v1/customer/customer-billing-address-details/${previousData.id}/`
      );
      setBillingData({ found: true, data: response.data });
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setBillingData({ found: false, data: [] });
    }
  }
  const onEditSubmit = (data) => {
    console.log(data);
    updateData(data);
  };
  //ref handlers
  const pageSwitcherRef = (type) => {
    if (type === 'account') {
      accountPageRef.current.style.display = 'block';
      billingShippingPageRef.current.style.display = 'none';
      addAddressPageRef.current.style.display = 'none';
      orderHistoryPageRef.current.style.display = 'none';
    } else if (type === 'billing' || type === 'shipping') {
      billingShippingPageRef.current.style.display = 'block';
      accountPageRef.current.style.display = 'none';
      addAddressPageRef.current.style.display = 'none';
      orderHistoryPageRef.current.style.display = 'none';
    } else {
      orderHistoryPageRef.current.style.display = 'block';
      billingShippingPageRef.current.style.display = 'none';
      accountPageRef.current.style.display = 'none';
      addAddressPageRef.current.style.display = 'none';
    }
  };
  const billingShippingRefHandler = (type) => {
    if (type === 'billing') {
      billingAddressRef.current.classList.add('active');
      billingInformationTab.current.style.display = 'block';
      shippingAddressRef.current.classList.remove('active');
      shippingInformationTab.current.style.display = 'none';
    } else {
      shippingAddressRef.current.classList.add('active');
      shippingInformationTab.current.style.display = 'block';
      billingAddressRef.current.classList.remove('active');
      billingInformationTab.current.style.display = 'none';
    }
  };
  // props
  const customerInformation = {
    name: previousData.name,
    url: location.pathname,
  };

  useEffect(() => {
    getShippingAddress();
    getBillingAddress();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-4">{previousData.name}</h1>
          <div className="page-header-button-container col-xs-12 col-md-8">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                pageSwitcherRef('account');
                setAccountInformation(true);
                setBillingInformation(false);
                setShippingInformation(false);
                setAddAddress(false);
              }}
            >
              Account Information
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                pageSwitcherRef('billing');
                setBillingInformation(true);
                setShippingInformation(false);
                setAccountInformation(false);
                setAddAddress(false);
                billingShippingRefHandler('billing');
              }}
            >
              Billing Information
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                pageSwitcherRef('shipping');
                setShippingInformation(true);
                setBillingInformation(false);
                setAccountInformation(false);
                setAddAddress(false);
                billingShippingRefHandler('shipping');
              }}
            >
              Shipping Information
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                pageSwitcherRef('history');
                setOrderHistory(true);
                setShippingInformation(false);
                setBillingInformation(false);
                setAccountInformation(false);
                setAddAddress(false);
              }}
            >
              Order History
            </button>
            <Link className="btn btn-primary" to="/admin/customers">
              <span>
                <FaUsers className="custom-icon" />
              </span>
              All Customer
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form
            onSubmit={handleEditSubmit(onEditSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
            ref={accountPageRef}
          >
            <div className="panel-heading">
              <p className="row-option-title">Account Information</p>
            </div>
            <br />
            <hr />
            <br />
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-12">
                  <label className="form-label required row-option-title">
                    Email
                  </label>
                  <input
                    type="email"
                    {...edit('email', { required: true })}
                    className={`form-control ${
                      editErrors.email ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {editErrors.email && "Can't be empty"}
                  </div>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Title</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...edit('designation')}
                  >
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
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
                    {...edit('first_name')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...edit('last_name')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Gender</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...edit('gender')}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    {...edit('phone')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Customer number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    {...edit('customer_number')}
                  />
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Save Customer
              </button>
            </div>
          </form>

          <div style={{ display: 'none' }} ref={billingShippingPageRef}>
            <div className="panel-heading">
              <p className="row-option-title">
                Billing and Shipping Information
              </p>
            </div>
            <br />
            <hr />
            <div className="panel-container">
              <span
                className="page-header-button-container col-xs-12 col-md-6"
                style={{ borderBottom: '1px solid #ddd' }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setBillingInformation(false);
                    setAccountInformation(false);
                    setAddAddress(true);
                    addAddressPageRef.current.style.display = 'block';
                    billingShippingPageRef.current.style.display = 'none';
                  }}
                >
                  Add New Address
                </button>
              </span>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    ref={billingAddressRef}
                    onClick={() => {
                      billingShippingRefHandler('billing');
                    }}
                  >
                    Billing Address
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    ref={shippingAddressRef}
                    onClick={() => {
                      billingShippingRefHandler('shipping');
                    }}
                  >
                    Shipping Address
                  </a>
                </li>
              </ul>
              <div role="tabpanel" ref={billingInformationTab}>
                <div className="address-row">
                  <br />
                  {billingData.found ? (
                    <div>
                      <p>
                        {billingData.data.first_name}{' '}
                        {billingData.data.last_name}
                      </p>
                      <p>
                        <MdCall /> {billingData.data.phone}
                      </p>
                      <p>
                        <MdEmail /> {billingData.data.email}
                      </p>
                      <p>{billingData.data.address1}</p>
                      <p>{billingData.data.address2}</p>
                      <p>{billingData.data.city}</p>
                      <p>{billingData.data.country}</p>
                    </div>
                  ) : (
                    <p>No Billing address!</p>
                  )}
                </div>
              </div>
              <div
                role="tabpanel"
                ref={shippingInformationTab}
                style={{ display: 'none' }}
              >
                <div className="address-row">
                  <br />
                  {shippingData.found ? (
                    <div>
                      <p>
                        {shippingData.data.first_name}{' '}
                        {shippingData.data.last_name}
                      </p>
                      <p>
                        <MdCall /> {shippingData.data.phone}
                      </p>
                      <p>
                        <MdEmail /> {shippingData.data.email}
                      </p>
                      <p>{shippingData.data.address1}</p>
                      <p>{shippingData.data.address2}</p>
                      <p>{shippingData.data.city}</p>
                      <p>{shippingData.data.country}</p>
                    </div>
                  ) : (
                    <p>No Billing address!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
            style={{ display: 'none' }}
            ref={addAddressPageRef}
          >
            <div className="panel-heading">
              <p className="row-option-title">Add Address</p>
            </div>
            <br />
            <hr />
            <br />

            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Choose Type
                  </label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('type')}
                  >
                    <option value="BILLING">Billing Address</option>
                    <option value="SHIPPING">Shipping Address</option>
                  </select>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">Title</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('title')}
                  >
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('first_name')}
                  />
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('last_name')}
                  />
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">
                    Phone/Mobile
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    {...register('phone')}
                  />
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    {...register('email')}
                  />
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">Country</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('country')}
                  >
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">State</label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    {...register('state')}
                  >
                    {provinceData.map((province, index) => {
                      return (
                        <option value={province} key={index}>
                          {province}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Address Line 1
                  </label>
                  <input
                    className="form-control"
                    {...register('address_line_1')}
                  />
                </div>

                <div className="mb-3 col-12">
                  <label className="form-label row-option-title">
                    Address Line 2
                  </label>
                  <input
                    className="form-control"
                    {...register('address_line_2')}
                  />
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">
                    City/Area
                  </label>
                  <input className="form-control" {...register('city')} />
                </div>

                <div className="mb-3 col-xs-12 col-md-6">
                  <label className="form-label row-option-title">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    {...register('postal_code')}
                  />
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Add Address
              </button>
            </div>
          </form>
          <div ref={orderHistoryPageRef} style={{ display: 'none' }}>
            <OrderHistoryTable
              tableHeader={columns}
              tableData={data}
              tableFor="sales"
              customer={customerInformation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerPage;
