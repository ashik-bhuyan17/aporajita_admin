import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ManageCustomerGroupsTable from '../../../components/table/SpecificPage/Customers/ManageCustomerGroupsTable';
import { columns } from './demoData.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast';
import Progress from '../../../components/loading/Progress.jsx';

function ManageCustomerGroupsPage() {
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //API
  async function getData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/customer/customer-group-list/'
      );
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      setIsLoading(false);
    }
  }
  async function deleteData(id) {
    try {
      await axiosInstance.delete(
        `api/v1/customer/customer-group-details/${id}`
      );
      getData();
      successToast('Deleted successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Manage Customer Groups
          </h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/customers/groups/new" className="btn btn-primary">
              <span className="mx-1">
                <FaPlus />
              </span>
              Add New Customer Group
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <ManageCustomerGroupsTable
            tableHeader={columns}
            tableData={data}
            deleteData={deleteData}
            tableFor="customer(s)"
          />
        </div>
      </div>
    </div>
  );
}

export default ManageCustomerGroupsPage;
