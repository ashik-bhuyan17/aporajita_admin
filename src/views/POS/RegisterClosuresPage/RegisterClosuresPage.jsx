import { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';

import RegisterClosuresTable from '../../../components/table/SpecificPage/POS/RegisterClosuresTable';
import { columns } from './demoData';

function RegisterClosuresPage() {
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/dummy/');
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
          <h1 className="page-title col-xs-12 col-md-6">Register Closures</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <button
              className="btn btn-success"
              type="button"
              id="calendarFilter"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Last 30 Days
              <span style={{ marginLeft: '3px' }}>
                <FaRegCalendarAlt />
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="calendarFilter">
              <li>
                <a className="dropdown-item" href="#">
                  Today
                </a>
                <a className="dropdown-item" href="#">
                  Yesterday
                </a>
                <a className="dropdown-item" href="#">
                  Last 7 Days
                </a>
                <a className="dropdown-item" href="#">
                  Last 30 Days
                </a>
                <a className="dropdown-item" href="#">
                  This Month
                </a>
                <a className="dropdown-item" href="#">
                  Last Month
                </a>
                <a className="dropdown-item" href="#">
                  Last 3 Months
                </a>
                <a className="dropdown-item" href="#">
                  Last 6 Months
                </a>
                <a className="dropdown-item" href="#">
                  Custom Range
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="panel-container">
          <RegisterClosuresTable
            tableHeader={columns}
            tableData={data}
            tableFor="shift(s)"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterClosuresPage;
