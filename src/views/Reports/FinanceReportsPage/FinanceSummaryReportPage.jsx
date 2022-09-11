import { createRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegCalendarAlt, FaRegFileAlt } from 'react-icons/fa';

import { errorToast } from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';
import Progress from '../../../components/loading/Progress';

function FinanceSummaryReportPage() {
  const tabRefs = useRef([]);
  const tab = ['All Channels', 'Web', 'Manual', 'In Store'];
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //handlers
  const tabClickHandler = (tab) => {
    for (let i = 0; i < tabRefs.current.length; i++) {
      if (tabRefs.current[i].current.innerHTML === tab) {
        tabRefs.current[i].current.classList.add('selected');
      } else {
        tabRefs.current[i].current.classList.remove('selected');
      }
    }

    const filteredData = data.filter((item) => {
      if (tab === 'All') {
        return true;
      } else {
        return item.status === tab;
      }
    });

    setData(filteredData);
  };

  useEffect(() => {
    tabRefs.current[0].current.classList.add('selected');
    //API
    (async function getData() {
      try {
        const response = await axiosInstance.get('api/v1/inventory/dummy/');
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
        errorToast(
          'Error on loading finance summary report!, Please try again.'
        );
      }
    })();
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Finance Reports</h1>
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

        <div className="row">
          <div className="col-md-2" style={{ padding: '20px' }}>
            <ul className="list-unstyled report">
              <li className="active">
                <Link to="/admin/reports/finance-summary">
                  <FaRegFileAlt className="fa-right" />
                  Finance Summary Report
                </Link>
              </li>

              <li>
                <Link to="/admin/reports/sales-over-time">
                  <FaRegFileAlt className="fa-right" />
                  Sales Over Time Report
                </Link>
              </li>
              <li>
                <Link to="/admin/reports/sales-by-product">
                  <FaRegFileAlt className="fa-right" />
                  Sales By Product
                </Link>
              </li>
              <li>
                <Link to="/admin/reports/sales-by-brand">
                  <FaRegFileAlt className="fa-right" />
                  Sales By Brand
                </Link>
              </li>
              <li>
                <Link to="/admin/reports/sales-by-discount">
                  <FaRegFileAlt className="fa-right" />
                  Sales By Discount
                </Link>
              </li>
              <li>
                <Link to="/admin/reports/payments-over-time">
                  <FaRegFileAlt className="fa-right" />
                  Payments Over Time Report
                </Link>
              </li>
              <li>
                <Link to="/admin/reports/payment-method-report">
                  <FaRegFileAlt className="fa-right" />
                  Payments Method Report
                </Link>
              </li>
              <li>
                <Link to="/admin/reports/store-conversion-rate-over-time">
                  <FaRegFileAlt className="fa-right" />
                  Store Conversion Rate Over Time
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6">
                <div className="panel-container">
                  <div className="table-tab-button-container">
                    {tab.map((tab, index) => {
                      const newRef = createRef();
                      tabRefs.current[index] = newRef;
                      return (
                        <div
                          className="tab-button"
                          onClick={() => {
                            tabClickHandler(tab);
                          }}
                          key={index}
                          ref={tabRefs.current[index]}
                          value={tab}
                        >
                          {tab}
                        </div>
                      );
                    })}
                  </div>
                  <table className="table-responsive" role="table">
                    <thead>
                      <tr>
                        <th className="big-title">Sales Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="small-row-option-title">Gross Sales</td>
                        <td className="text-right">0</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">Discounts</td>
                        <td className="text-right">-(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">
                          Shipping/Delivery
                        </td>
                        <td className="text-right">-(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">Tax</td>
                        <td className="text-right">-(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">Net Sales</td>
                        <td className="text-right">(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">
                          Cost of Goods Sold
                        </td>
                        <td className="text-right">(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">Gross Profit</td>
                        <td className="text-right">(BDT)0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="panel-container">
                  <table className="table-responsive" role="table">
                    <thead>
                      <tr>
                        <th className="big-title">Payments Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="small-row-option-title">Transactions</td>
                        <td className="text-right">0</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">
                          Gross Payments
                        </td>
                        <td className="text-right">-(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">Refunds</td>
                        <td className="text-right">-(BDT)0.00</td>
                      </tr>
                      <tr>
                        <td className="small-row-option-title">Net Payments</td>
                        <td className="text-right">(BDT)0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default FinanceSummaryReportPage;
