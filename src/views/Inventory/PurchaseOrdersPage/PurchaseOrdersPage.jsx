import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import Pagination from '../../../components/others/pagination.jsx';

import { columns } from './demoData';
import PurchaseOrdersTable from '../../../components/table/SpecificPage/Inventory/PurchaseOrdersTable';

function PurchaseOrdersPage() {
  const tableTab = [
    'All',
    'Draft',
    'Open',
    'Partially Received',
    'Received',
    'Closed',
  ];
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //handlers
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/products/');
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  //----------API------END-------

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Purchase Orders</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link
              to="/admin/inventory/purchase-orders/new"
              className="btn btn-primary"
            >
              <span className="mx-1">
                <FaPlus />
              </span>
              Create New Purchase Order
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <PurchaseOrdersTable
            tableHeader={columns}
            tableData={data}
            tableFor="purchase orders"
            tableTab={tableTab}
          />
        </div>
      </div>
    </div>
  );
}

export default PurchaseOrdersPage;
