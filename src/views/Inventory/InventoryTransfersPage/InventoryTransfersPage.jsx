import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { columns } from './demoData';
import TransferOrdersTable from '../../../components/table/SpecificPage/Inventory/TransferOrdersTable';
import axiosInstance from '../../../helpers/axios';
import { errorToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';

function InventoryTransfersPage() {
  const tableTab = ['All', 'Open', 'Sent', 'Received', 'Partially Received'];
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/dummy/');
      setData(response.data);
      setRawData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  //----------API------END-------

  useEffect(() => {
    //API
    getData();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Transfer Orders</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link
              to="/admin/inventory/transfer-orders/new"
              className="btn btn-primary"
            >
              <span className="mx-1">
                <FaPlus />
              </span>
              Create New Transfer Order
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <TransferOrdersTable
            tableHeader={columns}
            tableData={data}
            tableFor="transfer order(s)"
            tableTab={tableTab}
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryTransfersPage;
