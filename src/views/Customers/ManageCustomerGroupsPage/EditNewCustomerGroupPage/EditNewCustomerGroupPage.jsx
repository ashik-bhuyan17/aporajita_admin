import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AllCustomersTable from '../../../../components/table/SpecificPage/Customers/AllCustomersTable';
import { columns } from './demoData';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast';
import Progress from '../../../../components/loading/Progress.jsx';

function EditNewCustomerGroupPage() {
  //state
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // hooks
  const location = useLocation();
  const previousData = location.state;
  // making ready to intialize previousData
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...groupData,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    saveData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  //API
  async function getAllCustomerData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/customer/customer-profile-list/'
      );
      setAllCustomerData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      setIsLoading(false);
    }
  }
  async function getGroupData() {
    try {
      const response = await axiosInstance.get(
        `api/v1/customer/customer-group-details/${previousData.id}/`
      );
      setGroupData(response.data);
      reset(groupData);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      setIsLoading(false);
    }
  }
  //API
  async function saveData() {
    try {
      const response = await axiosInstance.put(
        `api/v1/customer/customer-group-details/${previousData.id}/`
      );
      setIsLoading(false);
      successToast('Updated successfuly');
    } catch (err) {
      errorToast('Error on updating data!, Please try again.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getGroupData();
    getAllCustomerData();
  }, [reset]);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Edit: {groupData.group_name}
          </h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/customers/manage" className="btn btn-primary">
              View All Groups
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <p className="row-option-title">Edit Customer Group</p>
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
                      errors.group_name ? 'is-invalid' : ''
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
                Update
              </button>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="panel-container">
              <AllCustomersTable
                tableData={allCustomerData}
                tableHeader={columns}
                tableFor="select"
                id={previousData.id}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="panel-container">
              <AllCustomersTable
                tableData={groupData.customer || []}
                tableHeader={columns}
                tableFor="remove"
                id={previousData.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNewCustomerGroupPage;
