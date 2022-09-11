import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { FaCaretDown, FaRegCalendarAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SalesHistoryTable from '../../../components/table/SpecificPage/POS/SaleHistoryTable';
import axiosInstance from '../../../helpers/axios';
import { errorToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import { columns } from './data';

function SalesHistoryPage() {
  //csv
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/pos/');
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
    const tempHeader = [];
    for (let i = 0; i < columns.length; i++) {
      tempHeader[i] = {
        label: columns[i].Header,
        key: columns[i].accessor,
      };
    }
    setCsvHeaders(tempHeader);
    const tempData = [];
    for (let i = 0; i < data.length; i++) {
      delete data.id;
      tempData[i] = data[i];
    }
    setCsvData(tempData);
  }, []);
  const tableTab = [
    'All',
    'Completed',
    'Park',
    'Lay By',
    'On Account',
    'Refunded',
  ];
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Sales History</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <button
              className="btn btn-info"
              type="button"
              id="export"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Export
              <span>
                <FaCaretDown className="btn-right-icon" />
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="export">
              <li>
                <CSVLink
                  filename="sales history.csv"
                  data={csvData}
                  headers={csvHeaders}
                  className="dropdown-item"
                >
                  Export to CSV
                </CSVLink>
              </li>
            </ul>
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
          <SalesHistoryTable
            tableHeader={columns}
            tableData={data}
            tableFor="sales(s)"
            tableTab={tableTab}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesHistoryPage;
