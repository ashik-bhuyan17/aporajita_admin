import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast } from '../../../helpers/toast.js';

import axiosInstance from '../../../helpers/axios.js';
import Progress from '../../../components/loading/Progress.jsx';
import Pagination from '../../../components/others/pagination.jsx';

import GridView from '../../../components/Dashboard/GridView';
import TopSellingProducts from '../../../components/Dashboard/TopSellingProducts';

import './DashboardPage.css';

function DashboardPage() {
  // refs
  const dashboardAllChannelsRef = useRef();
  const dashboardWebRef = useRef();
  const dashboardManualRef = useRef();
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // refs handler'
  const dashboardRefHandler = (givenRef) => {
    if (givenRef === dashboardAllChannelsRef) {
      dashboardAllChannelsRef.current.classList.add('active');
      dashboardWebRef.current.classList.remove('active');
      dashboardManualRef.current.classList.remove('active');
    } else if (givenRef === dashboardWebRef) {
      dashboardWebRef.current.classList.add('active');
      dashboardAllChannelsRef.current.classList.remove('active');
      dashboardManualRef.current.classList.remove('active');
    } else {
      dashboardManualRef.current.classList.add('active');
      dashboardWebRef.current.classList.remove('active');
      dashboardAllChannelsRef.current.classList.remove('active');
    }
  };

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
    // getData();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6 mb-4">Dashboard</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <button
              className="btn btn-primary"
              type="button"
              id="calendarFilter"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Today
              <span>
                <ChevronDown className="feather-icon-sm" />
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
        <ul className="nav nav-tabs dashboard-tabs">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link active"
              aria-current="page"
              ref={dashboardAllChannelsRef}
              onClick={() => {
                dashboardRefHandler(dashboardAllChannelsRef);
              }}
            >
              All Channels
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              ref={dashboardWebRef}
              onClick={() => {
                dashboardRefHandler(dashboardWebRef);
              }}
            >
              Web
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              ref={dashboardManualRef}
              onClick={() => {
                dashboardRefHandler(dashboardManualRef);
              }}
            >
              Manual
            </button>
          </li>
        </ul>
        <GridView />
        <div className="panel-container">
          <h1 className="option-title">Top Selling Products</h1>
          <TopSellingProducts />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
