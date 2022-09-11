import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import {
  FaCaretDown,
  FaRegCalendarAlt,
  FaSearch,
  FaRegFileAlt,
} from 'react-icons/fa';

import { errorToast } from '../../../../helpers/toast';
import axiosInstance from '../../../../helpers/axios';
import Progress from '../../../../components/loading/Progress';
import Pagination from '../../../../components/others/pagination';
import { columns as tableHeader, data as tableData } from './data.js';

function SalesByDiscountPage() {
  const tab = ['All Channels', 'Web', 'Manual', 'In Store'];
  //refs
  const tabRefs = useRef([]);
  //state
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //csv
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  //hooks
  const columns = useMemo(() => tableHeader, []);
  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    state: { pageSize },
    setPageSize,
    prepareRow,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  //handlers
  //tab
  const tabClickHandler = (tab) => {
    for (let i = 0; i < tabRefs.current.length; i++) {
      if (tabRefs.current[i].current.innerHTML === tab) {
        tabRefs.current[i].current.classList.add('selected');
      } else {
        tabRefs.current[i].current.classList.remove('selected');
      }
    }

    const filteredData = rawData.filter((item) => {
      if (tab === 'All') {
        return true;
      } else {
        return item.status === tab;
      }
    });

    setData(filteredData);
  };

  //search
  const searchHandler = (searchInput) => {
    if (searchInput.length > 0) {
      const searchResult = rawData.filter((data) => {
        if (data.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return data;
        }
      });
      setData(searchResult);
    } else {
      setData(rawData);
    }
  };

  useEffect(() => {
    tabRefs.current[0].current.classList.add('selected');
    setPageSize(15);
    //API
    (async function getData() {
      try {
        const response = await axiosInstance.get('api/v1/inventory/dummy/');
        setData(response.data);
        setRawData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
        errorToast(
          'Error on loading discount sales report!, Please try again.'
        );
      }
    })();
    //CSV
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

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Finance Reports</h1>
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
                <FaCaretDown />
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

        <div className="row">
          <div className="col-md-2">
            <ul className="list-unstyled report">
              <li>
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
              <li className="active">
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
              <div className="table-container">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="panel-filter">
                      <div className="inner-addon left-addon">
                        <FaSearch className="fa" />
                        <input
                          id="search-input"
                          type="text"
                          name="search"
                          className="form-control input-search"
                          placeholder="Search by discount code"
                          onChange={(e) => {
                            searchHandler(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-scroll">
                  <table
                    className="table-responsive table-container"
                    {...getTableProps()}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, index) => (
                            <th
                              scope="col"
                              key={index}
                              className={`table-header ${
                                index !== 0 && index !== 1 ? 'text-right' : ''
                              }`}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render('Header')}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <img
                                      src="/assets/icons/sort_both.png"
                                      className="table-sort-icon"
                                    />
                                  ) : (
                                    <img
                                      src="/assets/icons/sort_both.png"
                                      className="table-sort-icon"
                                    />
                                  )
                                ) : (
                                  column.disableSortBy !== true &&
                                  column.id !== 'selection' && (
                                    <img
                                      src="/assets/icons/sort_both.png"
                                      className="table-sort-icon"
                                    />
                                  )
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      <tr>
                        <td className="bold">Summary</td>
                        <td className="bold">0.00</td>
                        <td className="bold text-right">0.00</td>
                        <td className="bold text-right">0.00</td>
                      </tr>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr key={i} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                              return (
                                <td
                                  key={index}
                                  {...cell.getCellProps()}
                                  className={`${
                                    index !== 0 && index !== 1
                                      ? 'text-right'
                                      : ''
                                  }`}
                                >
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {rows.length === 0 && (
                  <div className="no-record-block">
                    <p className="message">No records to display</p>
                  </div>
                )}
                <div className="pagination-container">
                  {rows.length > pageSize && (
                    <Pagination
                      canPreviousPage={canPreviousPage}
                      previousPage={previousPage}
                      canNextPage={canNextPage}
                      nextPage={nextPage}
                      gotoPage={gotoPage}
                      totalPage={pageCount}
                    />
                  )}
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

export default SalesByDiscountPage;
